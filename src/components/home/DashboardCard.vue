<script lang="ts" setup>
import { toRefs } from 'vue';
import { topicInfo, formatDate } from '@/helpers/utils';
import type { Subscription } from '@/types/aedes';

const props = defineProps<{
  subscription: Subscription,
}>();
const { subscription } = toRefs(props);

const loading = false;
</script>

<template>
  <article
    class="card"
  >
    <article class="card__head">
      <div
        class="card__head__left"
        :class="topicInfo(subscription.topic).color"
      >
        <SvgComponent
          :icon="topicInfo(subscription.topic).icon"
          class="card__icon"
          :title="subscription.topic"
        />
        <h3>
          {{ topicInfo(subscription.topic).name }}
        </h3>
      </div>
      <div class="card__head__right">
        <span v-if="!loading && subscription.messages?.length">
          {{ formatDate(subscription.messages[0].date) }}
        </span>
        <div v-else class="loading-gray-small"></div>
        <SvgComponent
          icon="Arrow"
          class="card__arrow"
        />
      </div>
    </article>
    <article class="card__content">
      <p v-if="!loading && subscription.messages?.length">
        {{ subscription.messages[0].payload }}
      </p>
      <span v-if="!loading && subscription.messages?.length">
        {{ topicInfo(subscription.topic).label }}
      </span>
      <div v-else class="loading-gray" />
    </article>
  </article>
</template>

<style lang="scss" scoped>
.card {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
  display: grid;
  grid-template-columns: 100%;
  row-gap: 0.5rem;
  background-color: white;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &__left,
    &__right {
      display: flex;
      align-items: center;
    }
    
    &__left {
      column-gap: 0.5rem;
      font-weight: bold;
    }
    
    &__right {
      color: $text-gray;
      fill: $text-gray;
      column-gap: 0.25rem;
      font-size: 0.875rem;
    }
  }
    
  &__icon {
    height: 1.25rem;
    width: 1.25rem;
  }

  &__arrow {
    height: 0.875rem;
    width: 0.875rem;
    transform: rotate(90deg);
  }

  &__content {
    display: flex;
    align-items: baseline;
    column-gap: 0.125rem;

    p {
      font-size: 1.5rem;
      font-weight: bold;
    }

    span {
      color: $text-gray;
    }
  }

  &:hover {
    cursor: pointer;
  }
}

.blue {
  color: $blue-warning;
  fill: $blue-warning;
}

.red {
  color: $red-warning;
  fill: $red-warning;
}

.green {
  color: $green-warning;
  fill: $green-warning;
}

.yellow {
  color: $yellow-warning;
  fill: $yellow-warning;
}

</style>