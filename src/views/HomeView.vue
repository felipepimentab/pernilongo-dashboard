<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue';
import { useTopicsStore } from '@/stores/topics';
import { useBrokerStore } from '@/stores/broker';
import { useHistoryStore } from '@/stores/history';
import { useLoadingStore } from '@/stores/loading';
import { toRefs, onMounted } from 'vue';
import Chart from 'chart.js/auto'
import IconChevronRight from '@/components/base/svg/icons/IconChevronRight.vue';
import IconEngine from '@/components/base/svg/icons/IconEngine.vue';
import IconBox from '@/components/base/svg/icons/IconBox.vue';
import { formatRelativeDate, createPlotableArray, createDataArray, getShiftedWeekdays } from '@/helpers/utils';
import { formatDate } from '@/helpers/utils';
import BarLoading from '@/components/base/BarLoading.vue';

const { state, accepted, rejected } = toRefs(useTopicsStore());
const { rejectedHistory, acceptedHistory } = toRefs(useHistoryStore());
const { getTopicHistory } = useHistoryStore();
const { doPublish } = useBrokerStore();
const { loading } = toRefs(useLoadingStore());

function changeState() {
  doPublish(!state.value.message, '/belt/items')
}


onMounted(async () => {
  try {
    await getTopicHistory('rejected');
    await getTopicHistory('accepted');

  } catch (error) {
    console.error(error);
  } finally {
    const acceptedBoxes = createPlotableArray(acceptedHistory.value);
    const semana = getShiftedWeekdays(acceptedBoxes[0].time)
  
    const ctx = document.getElementById('chart') as HTMLElement;
    new Chart(ctx as any, {
      type: 'bar',
      data: {
        labels: semana,
        datasets: [{
          label: 'Caixas aceitas',
          data: createDataArray(acceptedBoxes),
          borderWidth: 2,
          borderRadius: 5,
          backgroundColor: 'rgba(0, 122, 255, 0.5)',
          borderColor: 'rgb(0, 122, 255)'
        },
        {
          label: 'Caixas rejeitadas',
          data: createDataArray(acceptedBoxes),
          borderWidth: 2,
          borderRadius: 5,
          backgroundColor: 'rgba(255, 59, 48, 0.5)',
          borderColor: 'rgb(255, 59, 48)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            stacked: true,
          },
          x: {
            stacked: true,
          }
        }
      }
    });
  }
})
</script>

<template>
  <main class="main">
    <HomeHeader />
    <div class="content">
    <article class="card">
      <div class="card__head">
        <h2>
          <IconEngine />
          Estado atual da esteira
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
            Fluxo de caixas no dia
          </h2>
          <span>
            {{ formatRelativeDate(accepted.time) }}
            <IconChevronRight title="Seta" />
          </span>
        </div>
        <div class="card__items">
          <div class="card__items__item">
            <p class="card__items__item--accepted">Aceitas</p>
            <p>
              <span class="card__items__item--value">{{ accepted.message }}</span>
              <span class="card__items__item--label"> caixas</span>
            </p>
          </div>
          <div class="card__items__item">
            <p class="card__items__item--rejected">Rejeitadas</p>
            <p>
              <span class="card__items__item--value">{{ rejected.message }}</span>
              <span class="card__items__item--label"> caixas</span>
            </p>
          </div>
          <div class="card__items__item">
            <p class="card__items__item--total">Total</p>
            <p>
              <!-- <span class="card__items__item--value">{{ items.message }}</span> -->
              <span class="card__items__item--value">{{ ((accepted.message as number) + (rejected.message as number)) || 0 }}</span>
              <span class="card__items__item--label"> caixas</span>
            </p>
          </div>
        </div>
      </article>      
    </div>
    
    <div class="card chart">
      <div class="card__head">
        <h2>
          <IconBox />
          Resumo do fluxo de caixas
        </h2>
        <span>
          Nos últimos 7 dias
          <IconChevronRight title="Seta" />
        </span>
      </div>
      <BarLoading v-if="loading"/>
      <canvas v-else id="chart"></canvas>
    </div>

    <!-- <div>
      <h4>WARNING</h4>
      <p>Message: {{ warning.message }}</p>
      <p>At: {{ warning.time }}</p>
    </div> -->
  </main>
</template>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: auto;
  row-gap: 1rem;

  @include screen(desktop-only) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
}

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
      font-size: 1.25rem;
      font-weight: bold;

      svg {
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
    color: $gray-1;

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

      &:not(:last-child) {
        border-right: 1px solid $gray-2;
      }

      &--label {
        color: $gray-1;
      }

      &--accepted {
        color: $blue;
        font-weight: bold;
      }

      &--rejected {
        color: $red;
        font-weight: bold;
      }

      &--total {
        color: $green;
        font-weight: bold;
      }

      &--value {
        font-size: 1.25rem;
        font-weight: bold;
      }
    }
  }

  .button {
    padding: 0.5rem 1.75rem;
    border-radius: 0.5rem;
    color: $white;
    font-weight: bold;
    background-color: $blue;

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

.dark {
  .card {
    background-color: $gray-6--dark;
  }
}
</style>