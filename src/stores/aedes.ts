import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import * as mqtt from 'mqtt/dist/mqtt.min';
import config from '@/helpers/config';

interface subscription {
  topic: String,
  qos: mqtt.QoS,
  msgs: Array<String | Object>
}

interface subInfo {
  topic: String,
  qos: mqtt.QoS,
}

interface publish {
  topic: String,
  qos: mqtt.QoS,
  payload: String | Object,
}

export const useAedesStore = defineStore('aedes', () => {
  const qosList = [0, 1, 2];
  
  const connection = reactive({
    protocol: "ws",
    host: config.host,
    port: config.port,
    endpoint: config.endpoint,
    clean: true,
    connectTimeout: 30 * 1000, // ms
    reconnectPeriod: 4000, // ms
    clientId: config.clientId + '_' + Math.random().toString(16).substring(2, 8),
    username: config.username,
    password: config.password,
  });

  const receiveNews: Ref<string> = ref("");

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
  
  function handleOnReConnect() {
    retryTimes.value += 1;
    if (retryTimes.value > 5) {
      try {
        client.value.end();
        initData();
        console.log("connection maxReconnectTimes limit, stop retry");
      } catch (error) {
        console.log("handleOnReConnect catch error:", error);
      }
    }
  };

  const listOfSubscriptions: Ref<Array<subscription>> = ref([]);
  
  /* 
  *  Exported functions
  */

  function newSubscription(subInfo: subInfo): void {
    if(!listOfSubscriptions.value.find(sub => sub.topic === subInfo.topic)) {
      const newSub: subscription = {
        topic: subInfo.topic,
        qos: subInfo.qos,
        msgs: [],
      };
      listOfSubscriptions.value.push(newSub);
      doSubscribe(newSub);
    } else {
      console.log('already subscribed')
    }
  }

  function createConnection() {
    try {
      const { protocol, host, port, endpoint, ...options } = connection;
      const connectUrl = `${protocol}://${host}:${port}${endpoint}`;
      client.value = mqtt.connect(connectUrl, options);
      if (client.value.on) {
        client.value.on("connect", () => {
          console.log("connection successful");
        });
        client.value.on("reconnect", handleOnReConnect);
        client.value.on("error", (error) => {
          console.log("connection error:", error);
        });
        client.value.on("message", (topic: string, message) => {
          receiveNews.value = receiveNews.value.concat(message.toString());
          const index = listOfSubscriptions.value.findIndex(sub => sub.topic === topic);
          listOfSubscriptions.value[index].msgs.push(message);
          console.log(`received message: ${message} from topic: ${topic}`);
        });
      }
    } catch (error) {
      console.log("mqtt.connect error:", error);
    }
  };
  
  // subscribe topic
  function doSubscribe(sub: subscription): void {
    const { topic, qos } = sub;
    client.value.subscribe(
      topic,
      { qos },
      (error: Error, granted: mqtt.ISubscriptionGrant[]) => {
        if (error) {
          console.log("subscribe error:", error);
          return;
        }
        subscribeSuccess.value = true;
        console.log("subscribe successfully:", granted);
      }
    );
  };
  
  // unsubscribe topic
  function doUnSubscribe(sub: subscription): void {
    const { topic, qos } = sub;
    client.value.unsubscribe(topic, { qos }, (error) => {
      subscribeSuccess.value = false;
      if (error) {
        console.log("unsubscribe error:", error);
        return;
      }
      console.log(`unsubscribed topic: ${topic}`);
    });
  };
  
  // publish message
  function doPublish(pub: publish): void {
    const { topic, qos, payload } = pub;
    client.value.publish(topic, payload, { qos }, (error) => {
      if (error) {
        console.log("publish error:", error);
        return;
      }
      console.log(`published message: ${payload}`);
    });
  };
  
  // disconnect
  function destroyConnection(): void {
    if (client.value.connected) {
      try {
        client.value.end(false, () => {
          initData();
          console.log("disconnected successfully");
        });
      } catch (error) {
        console.log("disconnect error:", error);
      }
    }
  };
  
  function handleProtocolChange(value: string) {
    connection.port = value === "wss" ? 8084 : 8083;
  };
  
  return {
    // variables (state)
    client,
    listOfSubscriptions,
    // variables (computed)
      //
    // functions (actions)
    newSubscription,
    createConnection,
    doSubscribe,
    doUnSubscribe,
    doPublish,
    destroyConnection,
    handleProtocolChange
  }
})
