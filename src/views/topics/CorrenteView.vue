<script lang="ts" setup>
import PageHeader from '@/components/common/PageHeader.vue';
import { useHistoryStore } from '@/stores/history';
import { storeToRefs } from 'pinia';

const store = useHistoryStore();
const { getTopicHistory } = useHistoryStore()
const { currentHistory } = storeToRefs(store);

if(!currentHistory.value) {
  console.log('into IF')
  getTopicHistory('current').then((res) => console.log(res));
}
</script>

<template>
  <main class="main">
    <PageHeader>
      Corrente
    </PageHeader>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi animi consequatur, rem vitae doloribus amet quos eius voluptas nisi quia odit quas, autem quaerat, eveniet itaque recusandae quam cum voluptatibus.</p>
    <p v-if="!currentHistory">Carregando...</p>
    <ul v-else>
      <li v-for="pub in currentHistory" :key="pub.payload.time">
        {{ pub.payload.message }} at {{ pub.payload.time }}
      </li>
    </ul>
  </main>
</template>