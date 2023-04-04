<!-- eslint-disable no-undef -->
<script setup lang="ts">
import DashboardInfo from '@/components/home/DashboardInfo.vue'
import DashboardDetails from '@/components/home/DashboardDetails.vue'
import DashboardActions from '@/components/home/DashboardActions.vue'
import SectionTitle from '@/components/SectionTitle.vue';
import ConnectionStatus from '@/components/home/ConnectionStatus.vue';

import { useAedesStore } from '@/stores/aedes';
import type * as mqtt from 'mqtt/dist/mqtt.min';

// Aedes store
const aedes = useAedesStore();
let loading: number = 0;

let myTopic: string = '';
let myQoS: mqtt.QoS = 0;

function newSub(): void {
  console.log('sub info:', { path: myTopic, qos: myQoS })
  aedes.newSubscription({
    path: myTopic,
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
    <ConnectionStatus />
    
    <SectionTitle>
      Informações
    </SectionTitle>
    <DashboardInfo />
    
    <SectionTitle>
      Detalhes
    </SectionTitle>
    <DashboardDetails />
    
    <SectionTitle>
      Comandos
    </SectionTitle>
    <DashboardActions />
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
</style>
