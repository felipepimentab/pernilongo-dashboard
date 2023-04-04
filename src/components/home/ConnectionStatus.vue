<script lang="ts" setup>
import { useAedesStore } from '@/stores/aedes';
import { ref } from 'vue';
import type { Ref } from 'vue';

const aedes = useAedesStore();
const connected: Ref<boolean> = ref(aedes.client.connected);
</script>

<template>
  <section class="connection">
    <SvgComponent
      icon="Mosquito"
      class="connection__icon"
    />
    <div>
      <h2 class="connection__name">
        Pernilongo Broker
      </h2>
      <p class="connection__status">
        <span>Status: </span>
        <span class="state" :class="{ 'connected': connected }">
          {{ connected ? 'Conectado' : 'Não conectado' }}
        </span>
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.connection {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  column-gap: 1rem;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  background-color: rgba($card-light, $alpha: 0.5);
  
  &__icon {
    fill: $text-light;
    height: 2rem;
    width: 2rem;
  }
  
  &__name {
    font-weight: bold;
    color: $text-light;
  }
  
  &__status {
    color: $text-light;

    .state {
      font-weight: bold;
      color: red;
    }
    
    .connected {
      color: green;
    }
  }
}

.dark {
  .connection {
    background-color: rgba($card-dark, $alpha: 0.5);

    &__icon {
      fill: $text-dark;
    }

    &__name,
    &__status {
      color: $text-dark;
    }
  }
}
</style>