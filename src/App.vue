<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageFooter from './components/common/PageFooter.vue';
import PageHeader from './components/common/PageHeader.vue';
</script>

<template>
  <div class="wrapper">
    <PageHeader />
    <RouterView />
    <PageFooter />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  font-family: $font-sans;
  color: $text-dark;
  position: relative;  
  // background-image: linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%);
  // background-image: linear-gradient(180deg, #4e1736 0%, #22162c 50%, #0d2230 100%);
}

html,
body {
  background-color: $bg-fallback-dark;
  overflow-x: hidden;
  max-width: 100vw;
}
</style>