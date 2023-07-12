import { defineStore, acceptHMRUpdate } from 'pinia'
import { reactive, ref } from "vue";
import type { Subscription, TopicPath, ConnectionStatus } from '@/types/common';
import { topicsList } from '@/helpers/config';
import * as mqtt from "mqtt/dist/mqtt.min";
import type { QoS } from 'mqtt';
import { useTopicsStore } from './topics';

export const useBrokerStore = defineStore('broker', () => {
  const brokerUrl = import.meta.env.VITE_BROKER_URL;
  const { receiveMessage } = useTopicsStore();

  const connection = reactive({
    protocol: "ws",
    host: brokerUrl,
    // ws: 8083; wss: 8084
    port: 8083,
    endpoint: "",
    // for more options, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
    clean: true,
    connectTimeout: 30 * 1000, // ms
    reconnectPeriod: 4000, // ms
    clientId: "web_" + Math.random().toString(16).substr(2, 8),
    // auth
    username: "pernilongo-broker",
    password: "pernilongo12345",
  });

  const connectionStatus = ref<ConnectionStatus>('connecting');

  const client = ref({
    connected: false,
  } as mqtt.MqttClient);
  const subscribeSuccess = ref(false);
  const retryTimes = ref(0);
  
  const initData = () => {
    client.value = {
      connected: false,
    } as mqtt.MqttClient;
    retryTimes.value = 0;
    subscribeSuccess.value = false;
  };
  
  const handleOnReConnect = () => {
    retryTimes.value += 1;
    if (retryTimes.value > 5) {
      try {
        client.value.end();
        initData();
        console.log("🛑 ~ Connection maxReconnectTimes limit, stop retry");
      } catch (error) {
        console.log("❌ ~ handleOnReConnect catch error:", error);
      }
    }
  };
  
  async function createConnection() {
    connectionStatus.value = 'connecting';
    try {
      const { protocol, host, port, endpoint, ...options } = connection;
      const connectUrl = `${protocol}://${host}:${port}${endpoint}`;
      client.value = mqtt.connect(connectUrl, options);
      if (client.value.on) {
        client.value.on("connect", () => {
          console.log("✅ ~ Connection successful");
          connectionStatus.value = 'success';
        });
        client.value.on("reconnect", handleOnReConnect);
        client.value.on("error", (error) => {
          console.log("❌ ~ Connection error:", error);
          connectionStatus.value = 'error';
        });
        client.value.on("message", (topic: string, message) => {
          receiveMessage(topic, message);
          console.log(`📩 ~ Received message: ${message} from topic: ${topic}`);
        });
      }
    } catch (error) {
      console.log("❌ ~ mqtt.connect error:", error);
    }
  };
  
  // subscribe topic
  // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
  function doSubscribe(subscription: Subscription) {
    const { topic, qos } = subscription;
    client.value.subscribe(
      topic,
      { qos },
      (error: Error, granted: mqtt.ISubscriptionGrant[]) => {
        if (error) {
          console.log("❌ ~ subscribe error:", error);
          return;
        }
        subscribeSuccess.value = true;
        console.log("📬 ~ Subscribe successfully:", granted);
      }
    );
  };
  
  // publish message
  // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
  const doPublish = (message: string | boolean | number, topic: TopicPath, qos: QoS = 0) => {
    const payload: string = JSON.stringify({
      message: message,
      time: new Date()
    });
    client.value.publish(topic, payload, { qos }, (error) => {
      if (error) {
        console.log("❌ ~ publish error:", error);
        return;
      }
      console.log(`📣 ~ Published message: ${payload} on topic: ${topic}`);
    });
  };
  
  function subscribeToAllTopics() {
    console.log("🚀 ~ file: broker.ts ~ client.value:", client.value)
    topicsList.forEach(sub => {
      doSubscribe(sub);
    })
  }

  return { connection, createConnection, subscribeToAllTopics, doPublish, connectionStatus }
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useBrokerStore, import.meta.hot))
}
