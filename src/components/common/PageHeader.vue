<script setup lang="ts">
/* import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark()
const toggleDark = useToggle(isDark) */
</script>

<template>
  <header class="header">
    <!-- <ul class="options">
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
    </ul> -->
    <h1 class="header__title">IoT Dashboard</h1>
    <SvgComponent
      icon="Mosquito"
      class="header__icon"
    />
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem $side-spacing;
  margin-top: 1rem;
  transition: color 0.3s ease-in-out;
  
  &__title {
    font-weight: bold;
    font-size: 2rem;
  }

  &__icon {
    height: 2.5rem;
    width: 2.5rem;
    fill: $white;
    background-color: $text-dark;
    border-radius: $radius-full;
    padding: 0.25rem;
  }
}
</style>