import { createRouter, createWebHistory } from 'vue-router'
import SolicitudesView from '@/views/SolicitudesView.vue'
import MetricasView from '@/views/MetricasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/SolicitudesView',
      name: 'SolicitudesView',
      component: SolicitudesView,
    },
    {
      path: '/MetricasView',
      name: 'MetricasView',
      component: MetricasView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
