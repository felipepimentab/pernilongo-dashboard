<template>
  <header class="header">
    <router-link
      class="header__link"
      :to="{ name: 'home' }"
    >
      <SvgComponent
        icon="Arrow"
        class="header__link__arrow"
      />
      Voltar
    </router-link>
    <h1 class="header__title">
      <slot />
    </h1>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;

  &__link {
    color: $blue;
    font-weight: bold;
    display: flex;
    align-items: center;
    column-gap: 0.25rem;

    &__arrow {
      fill: $blue;
      height: 0.85rem;
      width: 0.85rem;
      transform: rotate(-90deg);
    }
  }

  &__title {
    font-weight: bold;
    font-size: 2rem;
  }
}

.dark {
  .header__link {
    color: $blue--dark;

    &__arrow {
      fill: $blue--dark;
    }
  }
}
</style>