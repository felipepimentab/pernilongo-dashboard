<script setup lang="ts">
import { RouterView } from 'vue-router'
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