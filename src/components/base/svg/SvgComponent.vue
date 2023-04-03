<script setup lang="ts">
import { toRefs, computed, defineAsyncComponent } from 'vue';

const props = withDefaults(
  defineProps<{
    icon: String,
    title?: String,
  }>(),
  {
    title: () => '',
  }
);
const { icon, title } = toRefs(props);

const IconComponent = computed(
  () => defineAsyncComponent(() => import(`./icons/Icon${icon.value}.vue`))
)
</script>

<template>
  <component :is="IconComponent" :title="title ? title : icon"/>
</template>