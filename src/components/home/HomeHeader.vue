<script setup lang="ts">
// https://vueuse.org/core/useDark/
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header class="header">
    <h1 class="header__title">Pernilongo Dashboard</h1>
    <SvgComponent
      icon="Mosquito"
      class="header__icon"
      @click="toggleDark()"
    />
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  transition: all 0.3s ease-in-out;
  
  &__title {
    font-weight: bold;
    font-size: 2rem;
  }

  &__icon {
    height: 2.5rem;
    width: 2.5rem;
    fill: $text-color;
    background-color: $white;
    border-radius: $radius-full;
    padding: 0.25rem;
  }
}

.dark {
  .header__icon {
    fill: $text-color--dark;
    background-color: $gray-6--dark;
  }
}
</style>