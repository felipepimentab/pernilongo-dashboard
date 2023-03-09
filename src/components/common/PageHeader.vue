<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header container">
    <h1 class="title">IoT Dashboard</h1>
    <nav class="nav">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="/about">About</RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  background-color: lightgray;
  display: flex;
  justify-content: space-between;
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
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.router-link-active {
  font-weight: bold;
}
</style>