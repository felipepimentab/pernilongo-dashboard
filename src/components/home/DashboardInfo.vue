<script lang="ts" setup>
import { useAedesStore } from '@/stores/aedes';
import DashboardCard from './DashboardCard.vue';

// Aedes store
const aedes = useAedesStore();
const { state, speed, tension, current, temperature } = aedes;
</script>

<template>
  <section class="subs">
    <h2 class="subs__title">
      Resumo
    </h2>
  
    <router-link :to="{ name: 'state' }">
      <DashboardCard
        :subscription="(state)"
      />
    </router-link>

    <router-link :to="{ name: 'speed' }">
      <DashboardCard
        :subscription="(speed)"
      />
    </router-link>

    <router-link :to="{ name: 'tension' }">
      <DashboardCard
        :subscription="(tension)"
      />
    </router-link>

    <router-link :to="{ name: 'current' }">
      <DashboardCard
        :subscription="(current)"
      />
    </router-link>

    <router-link :to="{ name: 'temperature' }">
      <DashboardCard
        :subscription="(temperature)"
      />
    </router-link>
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

  &__title {
    display: inline;
    font-size: 1.25rem;
    font-weight: bold;

    @include screen (desktop-only) {
      grid-column-start: 1;
      grid-column-end: 4;
    }
  }

  @include screen(desktop-only) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>