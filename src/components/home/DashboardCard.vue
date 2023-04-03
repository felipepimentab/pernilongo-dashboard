<script lang="ts" setup>
import { toRefs, ref } from 'vue';
import type { Ref } from 'vue';
import { topicName, topicIcon, capitalize } from '@/helpers/utils';

const props = defineProps<{
  topic: string,
  qos: Number,
  msgs: Array<string>
  }>();
const { topic, qos, msgs } = toRefs(props);

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
    <div class="card__head">
      <SvgComponent
      :icon="topicIcon(topic)"
      class="card__head__icon"
      :title="topic"
      />
      <div>
        <h3 class="card__head__topic">{{ topicName(topic) }}</h3>
        <p class="card__head__preview">{{ capitalize(msgs[msgs.length - 1]) }}</p>
      </div>
    </div>
    <div
      class="card__body"
      :class="{ 'card__body--active': active }"
    >
      <p class="card__body__qos">QoS: {{ qos }}</p>
      <!-- <p
        v-for="msg in msgs"
        :key="msg"
        class="card__body__msg"
        >
        {{ msg }}
      </p> -->
    </div>
  </article>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/global';

.card {
  padding: 0.5rem 0.75rem;
  border-radius: 1rem;
  background-color: rgba($card-dark, $alpha: 0.5);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
  &__head {
    display: flex;
    align-items: center;
    column-gap: 0.5rem;
    overflow: visible;
    
    &__icon {
      fill: #0471a6;
      height: 1.5rem;
      width: 1.5rem;
      overflow: visible;
      border-radius: 100%;
      background-color: rgba($card-dark, 0.5);
      padding: 0.5rem;
      box-sizing: content-box;
    }

    &__topic {
      font-size: 1rem;
      font-weight: bold;
    }
  }
  
  &__body {
    height: 0;
    overflow: hidden;
    transition: height 0.3s ease-in-out;

    &--active {
      height: fit-content;
    }
  }

  &:hover {
    cursor: pointer;
  }


  &--active {
    background-color: rgba($text-dark, $alpha: 0.95);
    color: $card-dark;

    .card__head__icon {
      fill: $text-dark;
      background-color: #0471a6;
    }
  }
}
</style>