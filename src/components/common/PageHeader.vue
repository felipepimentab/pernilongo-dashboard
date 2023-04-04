<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';

const darkmode: Ref<boolean> = ref(false);

function toggleDarkMode(): void {
  darkmode.value = !darkmode.value;
  emit('darkmode', darkmode.value);
}

function addTopic(): void {
  console.log('Add topic');
}

const emit = defineEmits<{
  (e: 'darkmode', value: boolean):void
}>()
</script>

<template>
  <header class="header">
    <ul class="options">
      <li class="item">
        <button
          type="button"
          @click.prevent="addTopic"
        >
          <SvgComponent
            icon="Retry"
            title="Recarregar"
            class="item__icon"
          />
        </button>
      </li>
      <li class="item">
        <button
          type="button"
          @click.prevent="toggleDarkMode"
        >
          <SvgComponent
            v-if="darkmode"
            icon="DarkMode"
            title="Modo escuro"
            class="item__icon"
            />
          <SvgComponent
            v-else
            icon="LightMode"
            title="Modo claro"
            class="item__icon"
          />
        </button>
      </li>
    </ul>
    <h1 class="title">IoT Dashboard</h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  color: $text-dark;
  display: flex;
  flex-direction: column;
  padding: 0.5rem $side-spacing;
  row-gap: 0.5rem;
}

.title {
  font-weight: bold;
  font-size: 2rem;
}

.options {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  column-gap: 1rem;
}

.item {
  list-style: none;
  height: 1.5rem;
  width: 1.5rem;

  &:hover {
    cursor: pointer;
  }

  button:focus {
    outline: none;
  }

  &__icon {
    fill: $text-dark;
    height: 1.5rem;
  }
}
</style>