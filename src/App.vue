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
@import './assets/scss/global';

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100vw;
  font-family: $font-sans;
  color: $secondary-dark;
  background-color: $main-dark;
  position: relative;
}

html,
body {
  background-color: $main-dark;
  overflow-x: hidden;
  max-width: 100vw;
}
</style>