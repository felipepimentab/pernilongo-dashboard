<script setup lang="ts">
import PageHeader from './components/common/PageHeader.vue';
import { RouterView } from 'vue-router'
import PageFooter from './components/common/PageFooter.vue';
</script>

<template>
  <div class="wrapper">
    <PageHeader />
    <RouterView />
    <PageFooter />
  </div>
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
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  color: $text-color;
  position: relative;
  padding-bottom: 4rem;
  transition: all 0.3s ease-in-out;
}

.dark {
  background-color: $black;

  .wrapper {
    color: $text-color--dark;
  }
}
</style>