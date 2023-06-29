<script setup lang="ts">
// Components
import HomeHeader from '@/components/home/HomeHeader.vue';
import { useTopicsStore } from '@/stores/topics';
import { useBrokerStore } from '@/stores/broker';
import { toRefs } from 'vue';

// const { state, speed, tension, current, warning, temperature } = toRefs(useAedesStore());
const { state, items, accepted, rejected, warning } = toRefs(useTopicsStore());
const { doPublish } = useBrokerStore();

function changeState() {
  doPublish(!state.value.message, '/belt/state')
}
</script>

<template>
  <main class="main">
    <HomeHeader />
    <div>
      <h4>STATE</h4>
      <p>Message: {{ state.message }}</p>
      <p>At: {{ state.time }}</p>
    </div>
    <div>
      <h4>ITEMS</h4>
      <p>Message: {{ items.message }}</p>
      <p>At: {{ items.time }}</p>
    </div>
    <div>
      <h4>ACCEPTED</h4>
      <p>Message: {{ accepted.message }}</p>
      <p>At: {{ accepted.time }}</p>
    </div>
    <div>
      <h4>REJECTED</h4>
      <p>Message: {{ rejected.message }}</p>
      <p>At: {{ rejected.time }}</p>
    </div>
    <div>
      <h4>WARNING</h4>
      <p>Message: {{ warning.message }}</p>
      <p>At: {{ warning.time }}</p>
    </div>

    <div>
      <button type="button" @click="changeState()">Liga/Desliga</button>
    </div>
  </main>
</template>