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