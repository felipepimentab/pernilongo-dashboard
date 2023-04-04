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
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

html,
body {
  overflow-x: hidden;
  max-width: 100vw;
}

html {
  background-color: $bg-fallback-light;
  // background-image: linear-gradient(225deg, $bg-pink-light 0%, $bg-purple-light 50%, $bg-blue-light 100%);
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  font-family: $font-sans;
  color: $text-light;
  position: relative;
  transition: background-color 0.3s ease-in-out;
  padding-bottom: 4rem;
}

.dark {
  background-color: $bg-fallback-dark;
  // background-image: linear-gradient(225deg, $bg-pink-dark 0%, $bg-purple-dark 50%, $bg-blue-dark 100%);

  .wrapper {
    color: $text-dark;
  }
}
</style>