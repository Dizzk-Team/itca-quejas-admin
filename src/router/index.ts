import { createRouter, createWebHistory } from 'vue-router'
import SolicitudesView from '@/views/SolicitudesView.vue'
import MetricasView from '@/views/MetricasView.vue'
import LoginView from '@/views/LoginView.vue'
import InicioView from '@/views/InicioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: InicioView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/SolicitudesView',
      name: 'SolicitudesView',
      component: SolicitudesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/MetricasView',
      name: 'MetricasView',
      component: MetricasView,
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem('token_sesion')
  const estaAutenticado = Boolean(token && token !== 'undefined' && token !== 'null')

  if (to.meta.requiresAuth && !estaAutenticado) {
    return { name: 'login' }
  }

  if (to.name === 'login' && estaAutenticado) {
    return { name: 'inicio' }
  }

  return true
})

export default router