import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const count = ref<number>(0);
  const status = computed<boolean>(() => count.value > 0)

  function start() {
    count.value++;
  }

  function finish() {
    count.value--;
  }

  return { status, start, finish }
})
