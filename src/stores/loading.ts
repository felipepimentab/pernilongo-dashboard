import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
  const loadingCount = ref<number>(0);
  const loading: ComputedRef<boolean> = computed(() => loadingCount.value > 0)

  function increase(): void {
    loadingCount.value++
  }

  function decrease(): void {
    loadingCount.value--
  }

  return { loading, increase, decrease }
})