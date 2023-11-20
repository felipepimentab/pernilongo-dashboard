<script lang="ts" setup>
import PageHeader from '@/components/common/PageHeader.vue';
import { useRoute } from 'vue-router';
import { formatDate, createLabelsArray, getTopicTitle, createDataArray, getTopicLabel, getTopicUnits } from '@/helpers/utils';
import BarLoading from '@/components/base/BarLoading.vue';
import { useHistoryStore } from '@/stores/history';
import { useLoadingStore } from '@/stores/loading';
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';
import type { Topic } from '@/types/common';

const topic = useRoute().params.topic as Topic;
const { getTopicHistory } = useHistoryStore();
const loading = useLoadingStore();
const graphSize = 10;
const completeHistory = ref();

function buildChart(history: any) {
  const data = createDataArray(history, graphSize);
  const labels = createLabelsArray(history, graphSize);

  const ctx = document.getElementById('chart') as HTMLElement;
  new Chart(ctx as any, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: getTopicLabel(topic),
        data: data,
        borderWidth: 2,
        backgroundColor: 'rgba(0, 122, 255, 0.5)',
        borderColor: 'rgb(0, 122, 255)'
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

onMounted(async () => {
  try {
    loading.increase()
    const response = await getTopicHistory(topic);
    completeHistory.value = response.data.reverse();
    buildChart(response.data);

  } catch (error) {
    console.error(error);

  } finally {
    loading.decrease()
  }
})
</script>

<template>
  <main class="main">
    <PageHeader>{{ getTopicTitle(topic) }}</PageHeader>
    <h2>Últimas {{ graphSize }} publicações</h2>
    <BarLoading v-if="!completeHistory"/>
    <canvas id="chart" class="card">
    </canvas>
    <h2>Todas as publicações</h2>
    <div class="complete card">
      <p
        class="pub"
        v-for="pub in completeHistory"
        :key="pub._id"
      >
        <span class="message">{{ pub.payload.message + getTopicUnits(topic) }}</span>
        <span class="time">{{ formatDate( new Date(pub.payload.time)) }}</span>
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: $text-color;
}

.card {
  background-color: $white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  @include shadow;
}

.complete {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.pub {
  padding: 0.5rem;
  border-bottom: 1px solid $gray-5;
  display: grid;
  align-items: baseline;
  grid-template-columns: auto 1fr;
  column-gap: 1rem;

  &:last-child {
    border: none;
  }

  .message {
    font-size: 1.25rem;
    font-weight: bold;
    color: $text-color;
  }

  .time {
    font-size: 1rem;
    color: $text-gray;
  }
}
</style>