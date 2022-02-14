import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import { ref } from 'vue'
// const bar = ref(null)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts/:postid',
    name: 'Posts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Posts.vue')
  },
  {
    path: '/:404',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
