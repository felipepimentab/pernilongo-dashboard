import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { getSingleTopic } from '@/api';
import { useLoadingStore } from './loading';
import type { Topic } from '@/types/common';

export const useHistoryStore = defineStore('history', () => {
  const loading = useLoadingStore();
  const currentHistory = ref();
  const stateHistory = ref();
  const speedHistory = ref();
  const tensionHistory = ref();
  const temperatureHistory = ref();
  const warningHistory = ref();

  async function getTopicHistory(topic: Topic) {
    loading.increase()
    try {
      const response = await getSingleTopic(topic)
      switch (topic) {
        case 'current':
          currentHistory.value = response.data;
          break;
        case 'state':
          stateHistory.value = response.data;
          break;
        case 'speed':
          speedHistory.value = response.data;
          break;
        case 'tension':
          tensionHistory.value = response.data;
          break;
        case 'temperature':
          temperatureHistory.value = response.data;
          break;
        default:
          break;
      }
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.decrease()
    }
  }

  return {
    currentHistory,
    stateHistory,
    speedHistory,
    tensionHistory,
    temperatureHistory,
    warningHistory,
    getTopicHistory
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useHistoryStore, import.meta.hot))
}