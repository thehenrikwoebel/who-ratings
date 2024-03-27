import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../App.vue'
import NewView from '../views/New-View.vue'
import Hearts from '../views/Hearts-View.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/classic',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Classic-View.vue')
  },
  {
    path: '/new_who',
    name: 'New Who',
    component: NewView
  },
  {
    path: '/hearts',
    name: 'hearts',
    component: Hearts
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
