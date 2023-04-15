<script lang="ts" setup>
const props = defineProps<{
  warning?: string
}>();

const emit = defineEmits([
  'close'
]);
</script>

<template>
  <section
      v-if="warning"
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
      <button @click="emit('close')">
        <SvgComponent
          icon="Close"
          title="Fechar"
          class="warning__head__icon"
        />
      </button>
    </div>
    <p class="warning__content">
      {{ warning }}
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
  transition: background-color 0.3s ease-in-out;

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
      fill: $text-dark;
    }
  }

  &__content {
    padding: 0.25rem 1rem;
  }
}
</style>