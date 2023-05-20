<script lang="ts" setup>
import { useAedesStore } from '@/stores/aedes';
import DashboardCard from './DashboardCard.vue';

// Aedes store
const aedes = useAedesStore();
const { estado, velocidade, tensao, corrente, temperatura } = aedes;
</script>

<template>
  <section class="subs">
    <h2 class="subs__title">
      Resumo
    </h2>
  
    <router-link :to="{ name: 'estado' }">
      <DashboardCard
        :subscription="(estado)"
      />
    </router-link>

    <router-link :to="{ name: 'velocidade' }">
      <DashboardCard
        :subscription="(velocidade)"
      />
    </router-link>

    <router-link :to="{ name: 'tensao' }">
      <DashboardCard
        :subscription="(tensao)"
      />
    </router-link>

    <router-link :to="{ name: 'corrente' }">
      <DashboardCard
        :subscription="(corrente)"
      />
    </router-link>

    <router-link :to="{ name: 'temperatura' }">
      <DashboardCard
        :subscription="(temperatura)"
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