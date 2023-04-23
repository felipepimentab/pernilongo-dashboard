<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      :enter-active-class="route.name === 'home' ? 'animate__animated animate__fadeInLeft' : 'animate__animated animate__fadeInRight'"
      :leave-active-class="route.name === 'home' ? 'animate__animated animate__fadeOutRight' : 'animate__animated animate__fadeOutLeft'"
    >
      <component :is="Component" />
    </Transition>
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