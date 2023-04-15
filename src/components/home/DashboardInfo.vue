<script lang="ts" setup>
import { useAedesStore } from '@/stores/aedes';
import DashboardCard from './DashboardCard.vue';
import { ref } from 'vue';

// Aedes store
const aedes = useAedesStore();
const subs = ref(aedes.listOfSubscriptions);
</script>

<template>
  <section class="subs">
    <DashboardCard
      v-for="subscription in subs.filter(e => e.path !== 'motor/avisos')"
      :key="(subscription.path as string)"
      :path="(subscription.path as string)"
      :messages="(subscription.messages as string[])"
    />
  </section>
</template>

<style lang="scss" scoped>
.subs {
  display: grid;
  width: 100%;
  max-width: calc(100vw - 2rem);
  grid-template-columns: 1fr;
  row-gap: 0.5rem;
  column-gap: 0.5rem;
}
</style>