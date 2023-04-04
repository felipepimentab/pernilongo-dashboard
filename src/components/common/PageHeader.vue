<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark()
const toggleDark = useToggle(isDark)

function addTopic(): void {
  console.log('Add topic');
}
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
          @click.prevent="toggleDark()"
        >
          <SvgComponent
            v-if="isDark"
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
  display: flex;
  flex-direction: column;
  padding: 0.5rem $side-spacing;
  row-gap: 0.5rem;
  color: $text-light; //
  transition: color 0.3s ease-in-out;
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
    height: 1.5rem;
    fill: $text-light; //
  }
}

.dark {
  .header {
    color: $text-dark;
  }

  .item__icon {
    fill: $text-dark;
  }
}
</style>