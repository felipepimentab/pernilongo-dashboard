<!-- eslint-disable no-undef -->
<script setup lang="ts">
var texto = 'Não recebi nada ainda.';
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
