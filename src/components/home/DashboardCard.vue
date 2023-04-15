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
  border-radius: 0.5rem;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.5rem;
  font-weight: bold;
  background-color: white; //
  transition: background-color 0.3s ease-in-out;
    
  &__icon {
    height: 1rem;
    width: 1rem;
    fill: $text-dark;
    overflow: visible;
    box-sizing: content-box;
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
}

</style>