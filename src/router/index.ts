import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/warning',
      name: 'warning',
      component: () => import('../views/topics/AvisosView.vue')
    },
    {
      path: '/current',
      name: 'current',
      component: () => import('../views/topics/CorrenteView.vue')
    },
    {
      path: '/state',
      name: 'state',
      component: () => import('../views/topics/EstadoView.vue')
    },
    {
      path: '/temperature',
      name: 'temperature',
      component: () => import('../views/topics/TemperaturaView.vue')
    },
    {
      path: '/tension',
      name: 'tension',
      component: () => import('../views/topics/TensaoView.vue')
    },
    {
      path: '/speed',
      name: 'speed',
      component: () => import('../views/topics/VelocidadeView.vue')
    },
  ]
})

export default router
