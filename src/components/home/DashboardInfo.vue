<script lang="ts" setup>
import { useAedesStore } from '@/stores/aedes';
import DashboardCard from './DashboardCard.vue';

// Aedes store
const aedes = useAedesStore();

const mockSubs = [
  {
    topic: 'motor/estado',
    qos: 0,
    msgs: [
      'desligado',
      'desligado',
      'ligado',
      'ligado',
    ]
  },
  {
    topic: 'motor/velocidade',
    qos: 0,
    msgs: [
      '100 rpm',
      '120 rpm',
      '130 rpm',
      '140 rpm',
    ]
  },
  {
    topic: 'motor/tensao',
    qos: 0,
    msgs: [
      '100 V',
      '110 V',
      '115 V',
      '113 V',
    ]
  },
  {
    topic: 'motor/corrente',
    qos: 0,
    msgs: [
      '20 A',
      '30 A',
      '15 A',
      '10 A',
    ]
  },
  {
    topic: 'motor/temperatura',
    qos: 0,
    msgs: [
      '45°C',
      '50°C',
      '60°C',
      '62°C',
    ]
  },
  {
    topic: 'motor/avisos',
    qos: 0,
    msgs: [
      'temperatura ok',
      'temperatura ok',
      'temperatura ok',
      'alerta de temperatura',
    ]
  },
]
</script>

<template>
  <section class="subs">
    <DashboardCard
      v-for="subscription in mockSubs"
      :key="(subscription.topic as string)"
      :topic="subscription.topic"
      :qos="subscription.qos"
      :msgs="subscription.msgs"
    />
  </section>
</template>

<style lang="scss" scoped>
.subs {
  display: grid;
  width: 100%;
  max-width: calc(100vw - 2rem);
  grid-template-columns: 1fr 1fr;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
}
</style>