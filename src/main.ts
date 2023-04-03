import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import SvgComponent from './components/base/svg/SvgComponent.vue'


import './assets/scss/_global.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('SvgComponent', SvgComponent)

app.mount('#app')
