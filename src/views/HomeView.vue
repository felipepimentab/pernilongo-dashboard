<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue';
import { useTopicsStore } from '@/stores/topics';
import { useBrokerStore } from '@/stores/broker';
import { useHistoryStore } from '@/stores/history';
import { toRefs, onMounted } from 'vue';
import Chart from 'chart.js/auto'
import IconChevronRight from '@/components/base/svg/icons/IconChevronRight.vue';
import IconEngine from '@/components/base/svg/icons/IconEngine.vue';
import IconBox from '@/components/base/svg/icons/IconBox.vue';
import { formatRelativeDate } from '@/helpers/utils';
import { formatDate } from '@/helpers/utils';

// const { state, speed, tension, current, warning, temperature } = toRefs(useAedesStore());
const { state, items, accepted, rejected, warning } = toRefs(useTopicsStore());
// const { stateHistory, itemsHistory, rejectedHistory, acceptedHistory, warningHistory } = toRefs(useHistoryStore());
const { doPublish } = useBrokerStore();

function changeState() {
  doPublish(!state.value.message, '/belt/state')
}

onMounted(() => {
  const ctx = document.getElementById('chart') as HTMLElement;
  
  new Chart(ctx as any, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
})
</script>

<template>
  <main class="main">
    <HomeHeader />
    <article class="card">
      <div class="card__head">
        <h2>
          <IconEngine />
          Esteira
        </h2>
        <span>
          {{ formatRelativeDate(state.time) }}
          <IconChevronRight title="Seta" />
        </span>
      </div>
      <p class="card__state">
        <span :class="(state.message ? 'on' : 'off')">
          {{ state.message ? 'Ligada' : 'Desligada' }}
        </span>
        desde {{ formatDate(state.time) }}
      </p>
      <button
        type="button"
        class="button"
        @click.prevent="changeState"
      >
        {{ state.message ? 'Desligar' : 'Ligar' }}
      </button>
    </article>

    <article class="card">
      <div class="card__head">
        <h2>
          <IconBox />
          Caixas
        </h2>
        <span>
          {{ formatRelativeDate(items.time) }}
          <IconChevronRight title="Seta" />
        </span>
      </div>
      <div class="card__items">
        <div class="card__items__item">
          <p>Aceitas</p>
          <p>{{ accepted.message }}</p>
        </div>
        <div class="card__items__item">
          <p>Rejeitadas</p>
          <p>{{ rejected.message }}</p>
        </div>
        <div class="card__items__item">
          <p>Total</p>
          <p>{{ items.message }}</p>
        </div>
      </div>
    </article>

    <div>
      <h4>WARNING</h4>
      <p>Message: {{ warning.message }}</p>
      <p>At: {{ warning.time }}</p>
    </div>

    <div class="card chart">
      <canvas id="chart"></canvas>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  row-gap: 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  @include shadow;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      display: flex;
      align-items: center;
      column-gap: 0.5rem;
      color: $blue;
      font-size: 1.25rem;
      font-weight: bold;

      svg {
        fill: $blue;
        height: 1rem;
        width: auto;
      }
    }

    span {
      display: flex;
      align-items: center;
      column-gap: 0.5rem;
      color: $gray-1;

      svg {
        fill: $gray-1;
        height: 0.85rem;
        width: auto;
      }
    }
  }

  &__state {
    .on {
      font-size: 1.5rem;
      font-weight: bold;
      color: $green;
    }
    
    .off {
      font-size: 1.5rem;
      font-weight: bold;
      color: $red;
    }
  }

  &__items {
    display: grid;
    grid-template-columns: auto auto auto;
    width: fit-content;

    &__item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0 0.5rem;
      border-right: 2px solid $gray-1;
    }
  }

  .button {
    padding: 0.5rem 1.75rem;
    border-radius: 0.5rem;
    color: $white;
    font-weight: bold;
    background-color: $teal;

    &:not(:disabled) {
      @include shadow;
    }
  
    &:disabled {
      background-color: $gray-3;
      cursor: not-allowed;
    }
  }
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
</style>