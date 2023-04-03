<!-- eslint-disable no-undef -->
<script setup lang="ts">
import { useAedesStore } from '@/stores/aedes';
import DashboardInfo from '@/components/home/DashboardInfo.vue'
import type * as mqtt from 'mqtt/dist/mqtt.min';

// Aedes store
const aedes = useAedesStore();
let loading: number = 0;

let myTopic: string = '';
let myQoS: mqtt.QoS = 0;

function newSub(): void {
  console.log('sub info:', { topic: myTopic, qos: myQoS })
  aedes.newSubscription({
    topic: myTopic,
    qos: myQoS,
  });
}

async function connectToBroker(): Promise<void> {
  loading = loading++;
  if(!aedes.client.connected) {
    try {
      aedes.createConnection();
    } catch (error) {
      console.log('Error:', error);
    }
  }
  loading = loading--;
}

connectToBroker();
</script>

<template>
  <main class="main">
    <!-- TODO: fazer isso em componente separado -->
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
          <span class="state" :class="{ 'connected': aedes.client.connected }">
            {{ aedes.client.connected ? 'Conectado' : 'Não conectado' }}
          </span>
        </p>
      </div>
    </section>
    <DashboardInfo />
  </main>
</template>

<style lang="scss" scoped>
.main {
  padding: 0.5rem $side-spacing;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}

.teste {
  display: block;

  label: {
    display: block;
  }

  input {
    display: block;
    background-color: rgba(white, 0.15);
    padding: 0.25rem;
    border-radius: 0.25rem;
  }
}

.connection {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  column-gap: 1rem;
  background-color: rgba($card-dark, $alpha: 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  &__icon {
    fill: $text-dark;
    height: 2rem;
    width: 2rem;
  }

  &__name {
    font-weight: bold;
  }

  &__status {
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
