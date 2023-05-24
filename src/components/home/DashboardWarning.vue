<script lang="ts" setup>
import { formatDate } from '@/helpers/utils';
import { useAedesStore } from '@/stores/aedes';
const warnings = useAedesStore().warning;

function warningMsg(): string {
  return warnings.messages ? warnings.messages[0].payload.toString() : '';
}

function warningDate(): string {
  return warnings.messages ? formatDate(warnings.messages[0].date) : '';
}
</script>

<template>
  <section
      v-if="warningMsg() !== ''"
      class="warning"
    >
    <div class="warning__head">
      <div class="warning__head__left">
        <SvgComponent
          icon="Warning"
          class="warning__head__icon"
        />
        <p>Aviso</p>
      </div>
      <!-- <button>
        <SvgComponent
          icon="Close"
          title="Fechar"
          class="warning__head__icon"
        />
      </button> -->
      <span v-if="warnings.messages?.length">{{ warningDate() }}</span>
    </div>
    <p v-if="warnings.messages?.length" class="warning__content">
      {{ warningMsg() }}
    </p>
  </section>
</template>

<style lang="scss" scoped>
.warning {
  display: grid;
  align-items: center;
  width: 100%;
  background-color: $white;
  border-radius: 0.5rem;
  row-gap: 0.5rem;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: all 0.3s ease-in-out;

  &__head {
    background-color: $yellow-warning;
    font-weight: bold;
    border-radius: 0.5rem 0.5rem 0 0;
    padding: 0.25rem 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__left {
      display: flex;
      align-items: center;
      column-gap: 0.25rem;
    }

    &__icon {
      height: 1rem;
      width: 1rem;
      fill: $text-color;
    }
  }

  &__content {
    padding: 0.25rem 1rem;
  }
}
</style>