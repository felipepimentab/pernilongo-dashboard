<script setup lang="ts">
// https://vueuse.org/core/useDark/
import { useDark, useToggle } from '@vueuse/core';
import { useBrokerStore } from '@/stores/broker';
import { toRefs } from 'vue';
import IconAntennaError from '@/components/base/svg/icons/IconAntennaError.vue';
import IconAntenna from '@/components/base/svg/icons/IconAntenna.vue';
import type { ConnectionStatus } from '@/types/common'
const { connectionStatus } = toRefs(useBrokerStore());

const statusLabel = (status: ConnectionStatus) => {
  switch (status) {
    case 'connecting':
      return 'Conectando...';
    case 'error':
      return 'Desconectado';
    case 'success':
      return 'Conectado'
    default:
      break;
  }
}

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header class="header">
    <div class="header__content">
      <h1 class="header__title">Pernilongo Dashboard</h1>
      <span class="header__status">Status:
        <span
          class="header__status__label"
          :class="connectionStatus"
        >
          {{ statusLabel(connectionStatus) }}
          <IconAntenna v-if="connectionStatus === 'success'" />
          <IconAntennaError v-else />
        </span>
      </span>
    </div>
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
  padding: 0.5rem 0;
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

  &__status {
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
    
    &__label {
      font-weight: bold;
      display: flex;
      align-items: center;
      column-gap: 0.25rem;

      svg {
        width: 1rem;
        height: 1rem;
      }
    }

    .success {
      color: $green;
      fill: $green;
    }

    .error {
      color: $red;
      fill: $red;
    }

    .connecting {
      color: $orange;
      fill: $orange;
    }
  }
}

.dark {
  .header__icon {
    fill: $text-color--dark;
    background-color: $gray-6--dark;
  }
}
</style>