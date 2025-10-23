import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import BossList from '../components/BossList.vue'
import Imbuements from '../components/Imbuements.vue'
import Hunted from '../components/Hunted.vue'

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
  },
  {
    path: '/hunted',
    name: 'Hunted',
    component: Hunted
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
