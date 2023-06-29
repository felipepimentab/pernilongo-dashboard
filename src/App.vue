<script setup lang="ts">
import { reactive, ref } from "vue";
import { RouterView } from "vue-router";
import type { Subscription } from '@/types/common';
import { topicsList } from '@/helpers/config';
import * as mqtt from "mqtt/dist/mqtt.min";
import { useTopicsStore } from '@/stores/topics';
import type { QoS } from 'mqtt';
// vue 3 + vite use MQTT.js refer to https://github.com/mqttjs/MQTT.js/issues/1269

const { receiveMessage } = useTopicsStore();
const brokerUrl = import.meta.env.VITE_BROKER_URL;

// Connection settings
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

let client = ref({
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
      console.log("connection maxReconnectTimes limit, stop retry");
    } catch (error) {
      console.log("handleOnReConnect catch error:", error);
    }
  }
};

const createConnection = () => {
  try {
    const { protocol, host, port, endpoint, ...options } = connection;
    const connectUrl = `${protocol}://${host}:${port}${endpoint}`;
    client.value = mqtt.connect(connectUrl, options);
    if (client.value.on) {
      client.value.on("connect", () => {
        console.log("✅ ~ Connection successful");
      });
      client.value.on("reconnect", handleOnReConnect);
      client.value.on("error", (error) => {
        console.log("❌ ~ Connection error:", error);
      });
      client.value.on("message", (topic: string, message) => {
        receiveMessage(topic, message);
        console.log(`Received message: ${message} from topic: ${topic}`);
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
        console.log("subscribe error:", error);
        return;
      }
      subscribeSuccess.value = true;
      console.log("subscribe successfully:", granted);
    }
  );
};

// unsubscribe topic
// https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
function doUnSubscribe (subscription: Subscription) {
  const { topic, qos } = subscription;
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
// https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
const doPublish = (message: string | boolean | number, topic: string, qos: QoS = 0) => {
  const payload: string = JSON.stringify({
    message: message,
    time: new Date()
  });
  client.value.publish(topic, payload, { qos }, (error) => {
    if (error) {
      console.log("publish error:", error);
      return;
    }
    console.log(`published message: ${payload} on topic: ${topic}`);
  });
};

// disconnect
// https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
const destroyConnection = () => {
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

const handleProtocolChange = (value: string) => {
  connection.port = value === "wss" ? 8084 : 8083;
};

function inscrever() {
  topicsList.forEach(sub => {
    //subscription.value = sub;
    doSubscribe(sub);
  })
}

function handleStateChange(state: boolean) {
  doPublish(state, '/motor/state');
}

function handleSpeedChange(speed: number) {
  doPublish(speed, '/motor/speed');
}

createConnection();
inscrever();
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Component" />
  </RouterView>
</template>

<style lang="scss">
html,
body {
  overflow-x: hidden;
  max-width: 100vw;
}

html {
  transition: all 0.3s ease-in-out;
  background-color: $main-bg;
  color: $text-color;
}

.app {
  position: relative;
}

.dark {
  background-color: $black;
  color: $text-color--dark;
}
</style>