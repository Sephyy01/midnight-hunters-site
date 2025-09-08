import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import BossList from '../components/BossList.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
