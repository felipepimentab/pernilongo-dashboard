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
  color: $text-dark;
  column-gap: 0.5rem;

  &__text {
    font-size: 1.25rem;
    font-weight: bold;
  }

  &__icon {
    transform: rotate(90deg);
    fill: rgba($text-dark, 0.75);
    height: 0.75rem;
    width: 0.75rem;
  }
}
</style>