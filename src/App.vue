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
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: fit-content;
  min-height: 100vh;
}
</style>