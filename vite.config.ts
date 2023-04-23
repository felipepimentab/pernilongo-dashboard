import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/assets/scss/variables.scss";
        @import "@/assets/scss/colors.scss";
        @import "@/assets/scss/breakpoints.scss";
        @import "@/assets/scss/normalize.scss";
        @import "@/assets/scss/utils.scss";
        `,
      },
    },
  },
})
