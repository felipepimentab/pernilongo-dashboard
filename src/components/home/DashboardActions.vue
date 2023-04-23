<script lang="ts" setup>
import { useAedesStore } from '@/stores/aedes';
import { ref } from 'vue';

const aedes = useAedesStore();
const { estado, velocidade } = aedes;
const speed = ref(0);

function submit() {
  console.log('velocidade:', speed)
}
</script>

<template>
  <section class="actions">
    <h2 class="actions__title">
      Comandos
    </h2>
    <article class="card">
      <h3>Motor</h3>
      <div v-if="estado.messages" class="card__buttons">
        <button
          class="btn btn--on"
          :disabled="(estado.messages[0].payload as boolean)"
        >
          Ligar
        </button>
        <button
          class="btn btn--off"
          :disabled="(!estado.messages[0].payload as boolean)"
        >
          Desligar
        </button>
      </div>
    </article>
    <article class="card">
      <h3>Velocidade</h3>
      <form class="card__buttons">
        <input type="number" name="velocidade" id="velocidade" v-model="speed">
        <button type="submit" class="btn btn--speed" @click.prevent="submit">Alterar</button>
      </form>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.actions {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;

  &__title {
    font-size: 1.25rem;
    font-weight: bold;
  }
}

.card {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  display: block;
  align-items: center;
  justify-content: space-between;
  background-color: white;

  h3 {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }
  
  @include shadow;

  &__buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 0.5rem;

    input {
      background-color: $gray-6;
      grid-column-start: 1;
      grid-column-end: 4;
      border-radius: $radius-md;
      color: $text-color;
      padding: 0.5rem;
      font-weight: bold;
    }
  }

  .btn {
    padding: 0.5rem 1.5rem;
    border-radius: $radius-md;
    font-weight: bold;
    color: $white;

    &--on {
      background-color: $green;
      grid-column-start: 1;
      grid-column-end: 3;
    }
    
    &--off {
      background-color: $red;
      grid-column-start: 3;
      grid-column-end: 5;
    }
    
    &--speed {
      background-color: $blue;
      grid-column-start: 4;
      grid-column-end: 5;
    }

    &:disabled {
      color: $gray-1;
      background-color: $gray-6;
    }

    &:not(:disabled) {
      @include shadow;
    }
  }
}
</style>