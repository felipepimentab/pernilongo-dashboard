<script lang="ts" setup>
import { useAedesStore } from '@/stores/aedes';
import { ref } from 'vue';
import type { Ref } from 'vue';

const aedes = useAedesStore();
const connected: Ref<boolean> = ref(aedes.client.connected);
</script>

<template>
  <section class="connection">
    <div class="connection__head">
      <p>Status da conexão</p>
      <button>
        <SvgComponent
          icon="Close"
          title="Fechar"
          class="connection__head__icon"
        />
      </button>
    </div>
    <div class="connection__content">

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
  display: grid;
  align-items: center;
  width: 100%;
  background-color: $white;
  border-radius: 0.5rem;
  column-gap: 1rem;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: background-color 0.3s ease-in-out;

  &__head {
    background-color: $yellow-warning;
    font-weight: bold;
    border-radius: 0.5rem 0.5rem 0 0;
    padding: 0.25rem 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__icon {
      height: 1rem;
      width: 1rem;
    }
  }

  &__content {
    padding: 0.25rem 1rem;
  }
  
  &__name {
    font-weight: bold;
    transition: color 0.3s ease-in-out;
  }
  
  &__status {
    transition: color 0.3s ease-in-out;

    .state {
      font-weight: bold;
      color: red;
    }
    
    .connected {
      color: green;
    }
  }
}
</style>