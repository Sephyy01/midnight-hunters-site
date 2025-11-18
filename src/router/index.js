import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import BossList from '../components/BossList.vue'
import Imbuements from '../components/Imbuements.vue'
import Hunted from '../components/Hunted.vue'
import TS3Description from '../components/TS3Description.vue'

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
  },
  {
    path: '/descricao',
    name: 'TS3Description',
    component: TS3Description
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
