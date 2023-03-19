<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <h1 class="title">IoT Dashboard</h1>
    <nav>
      <ul class="nav">
        <li class="link">
          <RouterLink :to="{ name: 'home' }">Home</RouterLink>
        </li>
        <li class="link">
          <RouterLink :to="{ name: 'about' }">About</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/global';

.header {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: $secondary-dark;
  color: $main-dark;
  display: flex;
  justify-content: space-between;
  padding: 1rem $side-spacing;
}

.title {
  font-weight: bold;
}

.nav {
  display: flex;
  align-items: baseline;
  column-gap: 1rem;
}

.link {
  list-style: none;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.router-link-active {
  font-weight: bold;
}
</style>