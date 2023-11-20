<script setup lang="ts">
import HomeHeader from '@/components/home/HomeHeader.vue';
import { useTopicsStore } from '@/stores/topics';
import { useBrokerStore } from '@/stores/broker';
import { toRefs, ref } from 'vue';
import IconChevronRight from '@/components/base/svg/icons/IconChevronRight.vue';
import IconEngine from '@/components/base/svg/icons/IconEngine.vue';
import IconBox from '@/components/base/svg/icons/IconBox.vue';
import { formatRelativeDate } from '@/helpers/utils';
import { formatDate } from '@/helpers/utils';

const { state, temperature, current, tension, speed, warning } = toRefs(useTopicsStore());
const { doPublish } = useBrokerStore();
const inputSpeed = ref<number>(100);

function changeState() {
  doPublish(!state.value.message, '/motor/state')
}

function changeSpeed() {
  doPublish(inputSpeed.value, '/motor/speed')
}
</script>

<template>
  <main class="main">
    <HomeHeader />

    <div class="warning" v-if="warning">
      <h4>{{ warning.message }}</h4>
      <p>{{ formatDate(warning.time) }}</p>
    </div>

    <div class="content">
      <!-- Estado -->
      <article class="card">
        <div class="card__head">
          <h2>
            <IconEngine />
            Estado atual do motor
          </h2>
          <span>
            {{ formatRelativeDate(state.time) ?? 'Ver histórico' }}
          </span>
        </div>
        <p class="card__state">
          <span :class="(state.message ? 'on' : 'off')">
            {{ state.message ? 'Ligado' : 'Desligado' }}
          </span>
          desde {{ formatDate(state.time) }}
        </p>
        <button
          type="button"
          class="button"
          @click.prevent="changeState"
        >
          {{ state.message ? 'Desligar' : 'Ligar' }}
        </button>
      </article>

      <!-- Velocidade -->
      <article class="card">
        <router-link :to="{ name: 'topic', params: { topic: 'speed' } }" class="card__head">
          <h2>
            <IconBox />
            Velocidade
          </h2>
          <span>
            {{ formatRelativeDate(speed.time) ?? 'Ver histórico' }}
            <IconChevronRight title="Seta" />
          </span>
        </router-link>
        <p class="card__state">
          {{ speed.message + ' rpm' ?? 'Sem dados' }}
        </p>
        <form @submit.prevent="changeSpeed" class="speed-form">
          <input type="number" name="speed" id="speed" min="50" max="150" v-model="inputSpeed">
          <input type="submit" value="Enviar">
        </form>
      </article>

      <!-- Tensão -->
      <router-link :to="{ name: 'topic', params: { topic: 'tension' } }" class="card">
        <div class="card__head">
          <h2>
            <IconBox />
            Tensão
          </h2>
          <span>
            {{ formatRelativeDate(tension.time) ?? 'Ver histórico' }}
            <IconChevronRight title="Seta" />
          </span>
        </div>
        <p class="card__state">
          {{ tension.message + 'V' ?? 'Sem dados' }}
        </p>
      </router-link>

      <!-- Corrente -->
      <router-link :to="{ name: 'topic', params: { topic: 'current' } }" class="card">
        <div class="card__head">
          <h2>
            <IconBox />
            Corrente
          </h2>
          <span>
            {{ formatRelativeDate(current.time) ?? 'Ver histórico' }}
            <IconChevronRight title="Seta" />
          </span>
        </div>
        <p class="card__state">
          {{ current.message + 'A' ?? 'Sem dados' }}
        </p>
      </router-link>

      <!-- Temperatura -->
      <router-link :to="{ name: 'topic', params: { topic: 'temperature' } }" class="card">
        <div class="card__head">
          <h2>
            <IconBox />
            Temperatura
          </h2>
          <span>
            {{ formatRelativeDate(temperature.time) ?? 'Ver histórico' }}
            <IconChevronRight title="Seta" />
          </span>
        </div>
        <p class="card__state">
          {{ temperature.message + 'ºC' ?? 'Sem dados' }}
        </p>
      </router-link>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.content {
  display: grid;
  grid-template-columns: auto;
  row-gap: 1rem;

  @include screen(desktop-only) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
}

.warning {
  width: fit-content;
  column-gap: 1rem;
  text-align: left;
  display: flex;
  align-items: center;

  h4 {
    font-weight: bold;
    font-size: 1.25rem;
    color: $orange;
  }

  p {
    color: $gray-1;
  }
}

.card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  row-gap: 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  @include shadow;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: fit-content;

    h2 {
      display: flex;
      align-items: center;
      column-gap: 0.5rem;
      font-size: 1.25rem;
      font-weight: bold;

      svg {
        height: 1rem;
        width: auto;
      }
    }

    span {
      display: flex;
      align-items: center;
      column-gap: 0.5rem;
      color: $gray-1;

      svg {
        fill: $gray-1;
        height: 0.85rem;
        width: auto;
      }
    }
  }

  &__state {
    color: $gray-1;

    .on {
      font-size: 1.5rem;
      font-weight: bold;
      color: $green;
    }
    
    .off {
      font-size: 1.5rem;
      font-weight: bold;
      color: $red;
    }
  }

  .button {
    padding: 0.25rem 1rem;
    border-radius: 0.5rem;
    width: fit-content;
    color: $white;
    font-size: 1rem;
    font-weight: bold;
    background-color: $blue;

    &:not(:disabled) {
      @include shadow;
    }
  
    &:disabled {
      background-color: $gray-3;
      cursor: not-allowed;
    }
  }
}

.speed-form {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  input {
    background-color: $gray-5;
    font-size: 1rem;
    padding: 0.25rem 1rem;
    border-radius: 0.5rem;
    color: $text-gray;
    font-weight: bold;

    &:nth-child(2) {
      color: $white;
      background-color: $blue;
      @include shadow;
    }
  }
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.dark {
  .card {
    background-color: $gray-6--dark;
  }
}
</style>