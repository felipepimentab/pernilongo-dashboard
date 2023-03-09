<!-- eslint-disable no-undef -->
<script setup lang="ts">
import mqtt from 'mqtt';

var texto = 'Não recebi nada ainda.';

const client = mqtt.connect('ws://54.234.76.162:9001', {
  username: "pipopb",
  password: "pipopb109",
});
client.subscribe('mqtt/dht');
client.on('message', function (topic, payload) {
  if(payload)console.log(payload);
});
</script>

<template>
  <main class="container page-content">
    <h2 class="page-title">Home</h2>
    
    <article class="teste">
      <p class="texto">{{ texto }}</p>
      <button class="botao">Conectar</button>
    </article>
  </main>
</template>

<style lang="scss" scoped>
.page-title {
  font-weight: bold;
}
</style>
