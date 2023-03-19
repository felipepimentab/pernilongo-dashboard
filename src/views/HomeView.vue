<!-- eslint-disable no-undef -->
<script setup lang="ts">
import * as mqtt from "mqtt/dist/mqtt.min";

var texto = 'Não recebi nada ainda.';
</script>

<template>
  <main class="main">
    <h2 class="page-title">Home</h2>
    
    <article class="teste">
      <p class="texto">{{ texto }}</p>
      <button class="botao">Conectar</button>
    </article>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/global';

.main {
  padding: 1rem $side-spacing;
}

.page-title {
  font-weight: bold;
}
</style>
