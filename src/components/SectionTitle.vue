<template>
  <div class="section-title">
    <h2 class="section-title__text">
      <slot />
    </h2>
    <SvgComponent
      icon="Arrow"
      class="section-title__icon"
    />
  </div>
</template>

<style lang="scss" scoped>
.section-title {
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
  transition: color 0.3s ease-in-out;

  &__text {
    font-size: 1.25rem;
    font-weight: bold;
  }

  &__icon {
    transform: rotate(90deg);
    height: 1rem;
    width: 1rem;
    fill: $text-dark;
    transition: fill 0.3s ease-in-out;
  }
}
</style>