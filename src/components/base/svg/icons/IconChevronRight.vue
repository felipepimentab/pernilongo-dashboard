<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps<{
  title: String,
}>();
const { title } = toRefs(props);
</script>

<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="47.7539" height="84.8145" viewBox="0 0 47.7539 84.8145" fill-rule="nonzero">
    <title>{{ title }}</title>
    <g>
      <path d="M47.7539 42.3828C47.7539 41.1621 47.2656 40.0391 46.3379 39.1602L7.66602 1.26953C6.78711 0.439453 5.71289 0 4.44336 0C1.95312 0 0 1.9043 0 4.44336C0 5.66406 0.488281 6.78711 1.26953 7.61719L36.8164 42.3828L1.26953 77.1484C0.488281 77.9785 0 79.0527 0 80.3223C0 82.8613 1.95312 84.7656 4.44336 84.7656C5.71289 84.7656 6.78711 84.3262 7.66602 83.4473L46.3379 45.6055C47.2656 44.6777 47.7539 43.6035 47.7539 42.3828Z" />
    </g>
</svg>
</template>