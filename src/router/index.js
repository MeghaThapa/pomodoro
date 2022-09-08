import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
