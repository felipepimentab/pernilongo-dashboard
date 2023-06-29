// // disconnect
// // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
// const destroyConnection = () => {
//   if (client.value.connected) {
//     try {
//       client.value.end(false, () => {
//         initData();
//         console.log("disconnected successfully");
//       });
//     } catch (error) {
//       console.log("disconnect error:", error);
//     }
//   }
// };

// // use WSS
// const handleProtocolChange = (value: string) => {
//   connection.port = value === "wss" ? 8084 : 8083;
// };
  
// // unsubscribe topic
// // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
// function doUnSubscribe (subscription: Subscription) {
//   const { topic, qos } = subscription;
//   client.value.unsubscribe(topic, { qos }, (error) => {
//     subscribeSuccess.value = false;
//     if (error) {
//       console.log("unsubscribe error:", error);
//       return;
//     }
//     console.log(`unsubscribed topic: ${topic}`);
//   });
// };