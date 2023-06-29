<script setup lang="ts">
import { RouterView } from "vue-router";
import { useBrokerStore } from "./stores/broker";
// vue 3 + vite use MQTT.js refer to https://github.com/mqttjs/MQTT.js/issues/1269
const { createConnection, subscribeToAllTopics } = useBrokerStore();
createConnection().then(() => subscribeToAllTopics());
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
  overflow-y: scroll;
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