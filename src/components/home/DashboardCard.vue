<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import type { Ref } from 'vue';
import { topicName, topicIcon, capitalize } from '@/helpers/utils';

const props = defineProps<{
  path: string,
  qos: number,
  messages?: Array<string>
  }>();
const { path, qos, messages } = toRefs(props);

const active: Ref<boolean> = ref(false);
function toggleActive(): void {
  active.value = !active.value;
};
</script>

<template>
  <article
    class="card"
    :class="{ 'card--active': active }"
    @click="toggleActive"
  >
    <SvgComponent
    :icon="topicIcon(path)"
    class="card__icon"
    :title="path"
    />
    <div>
      <h3 class="card__topic">{{ topicName(path) }}</h3>
      <p v-if="messages" class="card__preview">{{ capitalize(messages[messages.length - 1]) }}</p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.card {
  padding: 0.5rem;
  border-radius: 100rem;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.5rem;
  font-weight: bold;
  background-color: $card-bg-light; //
  color: $text-light;
  transition: background-color 0.3s ease-in-out;
    
  &__icon {
    height: 1.5rem;
    width: 1.5rem;
    overflow: visible;
    border-radius: 100%;
    padding: 0.5rem;
    box-sizing: content-box;
    fill: $icon-yellow;
    background-color: $icon-bg-light; //
    transition: background-color 0.3s ease-in-out;
  }

  &__topic {
    font-size: 1rem;
  }

  &__preview {
    font-size: 0.875rem;
  }

  &:hover {
    cursor: pointer;
  }


  &--active {
    background-color: $card-bg-active-light; //
    color: $text-active-light;
    -webkit-box-shadow: 3px 3px 6px 0px rgba(0,0,0,0.15);
    -moz-box-shadow: 3px 3px 6px 0px rgba(0,0,0,0.15);
    box-shadow: 3px 3px 6px 0px rgba(0,0,0,0.15);

    .card__icon {
      fill: $text-light; //
      background-color: $icon-yellow-active; //
    }
  }
}

.dark {
  .card {
    background-color: $card-bg-dark; //

    &__icon {
      background-color: $icon-bg-dark; //
    }

    &--active {
      background-color: $icon-bg-active-dark; //
      color: $text-dark; //

      .card__icon {
        fill: $text-dark; //
        background-color: $icon-yellow-active;
      }
    }
  }
}
</style>