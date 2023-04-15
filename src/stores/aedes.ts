import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import * as mqtt from 'mqtt/dist/mqtt.min';
import { config, topicsList } from '@/helpers/config';
import type { Topic, ListOfTopics, Publish } from '@/types/aedes';

export const useAedesStore = defineStore('aedes', () => {
  /* Setup */
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
    userpath: config.username,
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

  /* Topics */

  const listOfTopics: ListOfTopics = topicsList;

  const listOfPublishers: Ref<Array<Publish>> = ref([]);

  const listOfSubscriptions: Ref<ListOfTopics> = ref([]);
  
  /* Exported functions */

  function newSubscription(subInfo: Topic): void {
    if(!listOfSubscriptions.value.find(sub => sub.path === subInfo.path)) {
      const newSub: Topic = {
        path: subInfo.path,
        qos: subInfo.qos,
        messages: [],
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
        client.value.on("message", (path: string, message) => {
          receiveNews.value = receiveNews.value.concat(message.toString());
          const index = listOfSubscriptions.value.findIndex(sub => sub.path === path);

          if(listOfSubscriptions.value[index].messages) {
            listOfSubscriptions.value[index].messages?.push(message);
          }

          console.log(`received message: ${message} from topic: ${path}`);
        });
      }
    } catch (error) {
      console.log("mqtt.connect error:", error);
    }
  };
  
  // subscribe topic
  function doSubscribe(sub: Topic): void {
    const { path, qos } = sub;
    client.value.subscribe(
      path,
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
  function doUnSubscribe(sub: Topic): void {
    const { path, qos } = sub;
    client.value.unsubscribe(path, { qos }, (error) => {
      subscribeSuccess.value = false;
      if (error) {
        console.log("unsubscribe error:", error);
        return;
      }
      console.log(`unsubscribed topic: ${path}`);
    });
  };
  
  // publish message
  function doPublish(pub: Publish): void {
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
    listOfTopics,
    listOfPublishers,
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
