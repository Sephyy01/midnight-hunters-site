import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import BossList from '../components/BossList.vue'
import Imbuements from '../components/Imbuements.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/boss-list',
    name: 'BossList',
    component: BossList
  },
  {
    path: '/streamers',
    name: 'Streamers',
    component: () => import('../components/Streamers.vue')
  },
  {
    path: '/imbuements',
    name: 'Imbuements',
    component: Imbuements
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
