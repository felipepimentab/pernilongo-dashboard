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
  column-gap: 0.5rem;
  color: $text-light; //
  transition: color 0.3s ease-in-out;

  &__text {
    font-size: 1.25rem;
    font-weight: bold;
  }

  &__icon {
    transform: rotate(90deg);
    height: 0.75rem;
    width: 0.75rem;
    fill: rgba($text-light, 0.75); //
    transition: fill 0.3s ease-in-out;
  }
}

.dark {
  .section-title {
    color: $text-dark;

    &__icon {
      fill: rgba($text-dark, 0.75);
    }
  }
}
</style>