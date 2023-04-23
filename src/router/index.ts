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
      path: '/avisos',
      name: 'avisos',
      component: () => import('../views/topics/AvisosView.vue')
    },
    {
      path: '/corrente',
      name: 'corrente',
      component: () => import('../views/topics/CorrenteView.vue')
    },
    {
      path: '/estado',
      name: 'estado',
      component: () => import('../views/topics/EstadoView.vue')
    },
    {
      path: '/temperatura',
      name: 'temperatura',
      component: () => import('../views/topics/TemperaturaView.vue')
    },
    {
      path: '/tensao',
      name: 'tensao',
      component: () => import('../views/topics/TensaoView.vue')
    },
    {
      path: '/velocidade',
      name: 'velocidade',
      component: () => import('../views/topics/VelocidadeView.vue')
    },
  ]
})

export default router
