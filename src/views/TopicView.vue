<script lang="ts" setup>
import PageHeader from '@/components/common/PageHeader.vue';
import { useRoute } from 'vue-router';
import type { Topic } from '@/types/common';
const topic = useRoute().params.topic as Topic;
</script>

<template>
  <main class="topic">
    <PageHeader>{{ topic }}</PageHeader>
  </main>
</template>

<style lang="scss" scoped>
.topic {
  padding: 1.5rem 4%;
}
</style>