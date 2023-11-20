<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue';
import { useTopicsStore } from '@/stores/topics';
import { useBrokerStore } from '@/stores/broker';
// import { useHistoryStore } from '@/stores/history';
// import { useLoadingStore } from '@/stores/loading';
import { toRefs } from 'vue';
// import Chart from 'chart.js/auto'
import IconChevronRight from '@/components/base/svg/icons/IconChevronRight.vue';
import IconEngine from '@/components/base/svg/icons/IconEngine.vue';
import IconBox from '@/components/base/svg/icons/IconBox.vue';
import { formatRelativeDate, createPlotableArray, createDataArray, getShiftedWeekdays } from '@/helpers/utils';
import { formatDate } from '@/helpers/utils';
import BarLoading from '@/components/base/BarLoading.vue';

const { state, temperature, current, tension, speed, warning } = toRefs(useTopicsStore());
const { doPublish } = useBrokerStore();

function changeState() {
  doPublish(!state.value.message, '/motor/state')
}


// onMounted(async () => {
//   try {
//     await getTopicHistory('rejected');
//     await getTopicHistory('accepted');

//   } catch (error) {
//     console.error(error);
//   } finally {
//     const acceptedBoxes = createPlotableArray(acceptedHistory.value);
//     const rejectedBoxes = createPlotableArray(rejectedHistory.value);
//     const semana = getShiftedWeekdays(acceptedBoxes[0].time)
  
//     const ctx = document.getElementById('chart') as HTMLElement;
//     new Chart(ctx as any, {
//       type: 'bar',
//       data: {
//         labels: semana,
//         datasets: [{
//           label: 'Caixas aceitas',
//           data: createDataArray(acceptedBoxes),
//           borderWidth: 2,
//           borderRadius: 5,
//           backgroundColor: 'rgba(0, 122, 255, 0.5)',
//           borderColor: 'rgb(0, 122, 255)'
//         },
//         {
//           label: 'Caixas rejeitadas',
//           data: createDataArray(rejectedBoxes),
//           borderWidth: 2,
//           borderRadius: 5,
//           backgroundColor: 'rgba(255, 59, 48, 0.5)',
//           borderColor: 'rgb(255, 59, 48)'
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             stacked: true,
//           },
//           x: {
//             stacked: true,
//           }
//         }
//       }
//     });
//   }
// })
</script>

<template>
  <main class="main">
    <HomeHeader />

    <div class="warning" v-if="warning">
      <h4>{{ warning.message }}</h4>
      <p>{{ formatDate(warning.time) }}</p>
    </div>

    <div class="content">
      <!-- Estado -->
      <article class="card">
        <div class="card__head">
          <h2>
            <IconEngine />
            Estado atual do motor
          </h2>
          <span>
            {{ formatRelativeDate(state.time) ?? 'Ver histórico' }}
          </span>
        </div>
        <p class="card__state">
          <span :class="(state.message ? 'on' : 'off')">
            {{ state.message ? 'Ligado' : 'Desligado' }}
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

      <!-- Velocidade -->
      <router-link :to="{ name: 'topic', params: { topic: 'speed' } }" class="card">
        <div class="card__head">
          <h2>
            <IconBox />
            Velocidade
          </h2>
          <span>
            {{ formatRelativeDate(speed.time) ?? 'Ver histórico' }}
            <IconChevronRight title="Seta" />
          </span>
        </div>
        <p class="card__state">
          {{ speed.message + ' rpm' ?? 'Sem dados' }}
        </p>
      </router-link>

      <!-- Tensão -->
      <router-link :to="{ name: 'topic', params: { topic: 'tension' } }" class="card">
        <div class="card__head">
          <h2>
            <IconBox />
            Tensão
          </h2>
          <span>
            {{ formatRelativeDate(tension.time) ?? 'Ver histórico' }}
            <IconChevronRight title="Seta" />
          </span>
        </div>
        <p class="card__state">
          {{ tension.message + 'V' ?? 'Sem dados' }}
        </p>
      </router-link>

      <!-- Corrente -->
      <router-link :to="{ name: 'topic', params: { topic: 'current' } }" class="card">
        <div class="card__head">
          <h2>
            <IconBox />
            Corrente
          </h2>
          <span>
            {{ formatRelativeDate(current.time) ?? 'Ver histórico' }}
            <IconChevronRight title="Seta" />
          </span>
        </div>
        <p class="card__state">
          {{ current.message + 'A' ?? 'Sem dados' }}
        </p>
      </router-link>

      <!-- Temperatura -->
      <router-link :to="{ name: 'topic', params: { topic: 'temperature' } }" class="card">
        <div class="card__head">
          <h2>
            <IconBox />
            Temperatura
          </h2>
          <span>
            {{ formatRelativeDate(temperature.time) ?? 'Ver histórico' }}
            <IconChevronRight title="Seta" />
          </span>
        </div>
        <p class="card__state">
          {{ temperature.message + 'ºC' ?? 'Sem dados' }}
        </p>
      </router-link>
    </div>
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

.warning {
  width: fit-content;
  column-gap: 1rem;
  text-align: left;
  display: flex;
  align-items: center;

  h4 {
    font-weight: bold;
    font-size: 1.25rem;
    color: $orange;
  }

  p {
    color: $gray-1;
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
    height: fit-content;

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