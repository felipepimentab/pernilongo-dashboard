<script setup lang="ts">
// vue 3 + vite use MQTT.js refer to https://github.com/mqttjs/MQTT.js/issues/1269
import * as mqtt from "mqtt/dist/mqtt.min";
import { reactive, ref } from "vue";

const qosList = [0, 1, 2];

const connection = reactive({
  protocol: "ws",
  host: "54.196.236.132",
  // ws: 8083; wss: 8084
  port: 8083,
  endpoint: "",
  // for more options, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
  clean: true,
  connectTimeout: 30 * 1000, // ms
  reconnectPeriod: 4000, // ms
  clientId: "web",
  // auth
  username: "pernilongo-broker",
  password: "pernilongo12345",
});

const subscription = ref({
  topic: "mqtt/teste",
  qos: 0 as mqtt.QoS,
});
const publish = ref({
  topic: "mqtt/teste",
  qos: 0 as mqtt.QoS,
  payload: '{ "msg": "Hello, I am browser." }',
});
const receiveNews = ref("");
let client = ref({
  connected: false,
} as mqtt.MqttClient);
const subscribeSuccess = ref(false);
const btnLoadingType = ref("");
const retryTimes = ref(0);

const initData = () => {
  client.value = {
    connected: false,
  } as mqtt.MqttClient;
  retryTimes.value = 0;
  btnLoadingType.value = "";
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
    btnLoadingType.value = "connect";
    const { protocol, host, port, endpoint, ...options } = connection;
    const connectUrl = `${protocol}://${host}:${port}${endpoint}`;
    client.value = mqtt.connect(connectUrl, options);
    console.group('About');
    console.log('connection:', connection);
    console.log('connectUrl:', connectUrl);
    console.log('client.value:', client.value);
    console.groupEnd();
    if (client.value.on) {
      client.value.on("connect", () => {
        btnLoadingType.value = "";
        console.log("connection successful");
      });
      client.value.on("reconnect", handleOnReConnect);
      client.value.on("error", (error) => {
        console.log("connection error:", error);
      });
      client.value.on("message", (topic: string, message) => {
        receiveNews.value = receiveNews.value.concat(message.toString());
        console.log(`received message: ${message} from topic: ${topic}`);
      });
    }
  } catch (error) {
    btnLoadingType.value = "";
    console.log("mqtt.connect error:", error);
  }
};

// subscribe topic
// https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
const doSubscribe = () => {
  btnLoadingType.value = "subscribe";
  const { topic, qos } = subscription.value;
  client.value.subscribe(
    topic,
    { qos },
    (error: Error, granted: mqtt.ISubscriptionGrant[]) => {
      btnLoadingType.value = "";
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
const doUnSubscribe = () => {
  btnLoadingType.value = "unsubscribe";
  const { topic, qos } = subscription.value;
  client.value.unsubscribe(topic, { qos }, (error) => {
    btnLoadingType.value = "";
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
const doPublish = () => {
  btnLoadingType.value = "publish";
  const { topic, qos, payload } = publish.value;
  client.value.publish(topic, payload, { qos }, (error) => {
    btnLoadingType.value = "";
    if (error) {
      console.log("publish error:", error);
      return;
    }
    console.log(`published message: ${payload}`);
  });
};

// disconnect
// https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
const destroyConnection = () => {
  if (client.value.connected) {
    btnLoadingType.value = "disconnect";
    try {
      client.value.end(false, () => {
        initData();
        console.log("disconnected successfully");
      });
    } catch (error) {
      btnLoadingType.value = "";
      console.log("disconnect error:", error);
    }
  }
};

const handleProtocolChange = (value: string) => {
  connection.port = value === "wss" ? 8084 : 8083;
};
</script>

<template>
  <div class="about">
    <h2>This is an about page</h2>
    <p>
      <button @click="createConnection()">Conectar</button>
    </p>
    <p>
      <button @click="destroyConnection()">Desconectar</button>
    </p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam risus, aliquet a placerat vel, mollis eu magna. Nulla aliquam ullamcorper nunc in porta. Pellentesque ullamcorper magna quis tellus fermentum elementum. Quisque lobortis urna id turpis aliquet, sed placerat nulla convallis. Quisque vel sodales lorem, ac auctor arcu. Sed gravida luctus convallis. Quisque commodo nisi in molestie lacinia. Etiam tincidunt in dolor eu mattis. Morbi mollis dictum ante, tempor pretium magna lobortis porttitor.</p>
    <p>Integer tincidunt neque vitae dolor posuere ultricies. Quisque pulvinar diam vitae metus congue pellentesque. Pellentesque sollicitudin bibendum arcu sed placerat. Nunc gravida magna massa. Maecenas quis hendrerit quam. Suspendisse fringilla ante nec eros sodales pretium. Nunc in convallis sem. Sed metus arcu, sagittis in laoreet eget, vehicula in sem.</p>
    <p>Fusce vitae ipsum tempor, tincidunt nisl sit amet, fermentum sapien. Quisque vitae mi id tellus auctor auctor. Aenean dignissim turpis mollis, feugiat tortor nec, dignissim augue. Mauris sagittis, elit ut blandit facilisis, diam purus lobortis elit, nec tristique neque purus at enim. Maecenas est metus, rhoncus vel lobortis eu, gravida vel erat. Donec dui diam, placerat consequat massa ac, dictum pharetra risus. Fusce a purus nec tortor aliquet hendrerit sit amet ut metus. Nam vitae ultricies nisl. Nunc ullamcorper, libero eget gravida mollis, turpis elit accumsan nunc, vel lacinia mi elit in metus. Etiam non mauris nec diam tincidunt sagittis.</p>
    <p>Fusce non diam sem. Ut tincidunt justo ac elit sollicitudin scelerisque. Donec egestas nunc vitae scelerisque facilisis. Vestibulum ut tincidunt diam. Suspendisse enim nisi, aliquam sed mollis in, pellentesque non massa. Mauris eget tellus aliquam metus gravida elementum. Phasellus quis ultricies felis. Aliquam erat volutpat. Nulla egestas gravida mauris, vel lacinia dolor volutpat vitae. Donec sit amet nisl sed ante tempus elementum nec nec nisi. Aenean condimentum non leo eget rhoncus. In lorem dui, sodales non feugiat eget, finibus eu odio. Vestibulum quam arcu, tincidunt in mollis eget, ultrices et elit. Vestibulum efficitur sem non arcu vehicula consectetur. Duis cursus nisl in nisi consectetur commodo. Pellentesque sodales lacinia justo, in imperdiet elit iaculis in.</p>
    <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc non nulla tempor, congue tellus quis, maximus elit. Nulla facilisi. Nullam efficitur ut magna quis semper. Cras interdum, enim ut posuere pellentesque, massa nunc pretium risus, sit amet dapibus velit arcu hendrerit dolor. Curabitur lacinia suscipit ligula, ac ultricies nunc sodales eu. Vivamus at mauris eget urna gravida dictum sit amet vitae ante. Vestibulum sed diam nisi. Etiam eros justo, elementum ut orci sed, scelerisque facilisis dolor. Vivamus sed mauris nec metus sagittis tincidunt. In dapibus non augue sit amet elementum. Mauris sed lectus in ipsum pellentesque rutrum at in velit.</p>
  </div>
</template>

<style lang="scss" scoped>
.about {
  padding: 1rem $side-spacing;
}
</style>