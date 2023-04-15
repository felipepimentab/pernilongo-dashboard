<script lang="ts" setup>
import { RouterLink } from 'vue-router'

</script>

<template>
  <footer class="footer">
    <nav>
      <ul class="nav">
        <li class="link">
          <RouterLink :to="{ name: 'home' }">
            <SvgComponent
              icon="HomeOutline"
              class="link__icon link__icon--outline"
              />
            <SvgComponent
              icon="HomeFilled"
              class="link__icon link__icon--filled"
            />
          </RouterLink>
        </li>
        <li class="link">
          <RouterLink :to="{ name: 'config' }">
            <SvgComponent
              icon="SettingsOutline"
              class="link__icon link__icon--outline"
              />
            <SvgComponent
              icon="SettingsFilled"
              class="link__icon link__icon--filled"
            />
          </RouterLink>
        </li>
        <li class="link">
          <RouterLink :to="{ name: 'about' }">
            <SvgComponent
              icon="HelpOutline"
              class="link__icon link__icon--outline"
              />
            <SvgComponent
              icon="HelpFilled"
              class="link__icon link__icon--filled"
            />
          </RouterLink>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: 1rem $side-spacing 1.5rem;
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: $white;
  border-top: 1px solid gainsboro;
}

.nav {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  column-gap: 1rem;
}

.link {
  list-style: none;
  height: 1.5rem;
  width: 1.5rem;
  
  &:hover {
    cursor: pointer;
  }
  
  button:focus {
    outline: none;
  }

  &__icon {
    height: 1.5rem;

    &--outline {
      display: block;
    }
    
    &--filled {
      display: none;
    }
  }
}

.router-link-active {
  .link__icon {
    &--outline {
      display: none;
    }
    
    &--filled {
      display: block;
    }
  }
}
</style>