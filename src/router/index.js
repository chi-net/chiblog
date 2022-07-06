import { createRouter, createWebHashHistory } from 'vue-router'
import settings from '@/mocks/settings'

const routes = [
  {
    path: '/',
    name: 'ArticleList',
    meta: {
      title: '文章列表 - ' + settings.site.title
    },
    component: () => import('../views/ArticleList.vue')
  },
  {
    path: '/articles/:path',
    name: 'Articles',
    component: () => import('../views/Article.vue'),
    props: true,
    meta: {
      title: '文章 - ' + settings.site.title
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      title: settings.site.title
    },
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to, from) => {
  window.scrollTo(0, 0)
  document.title = to.meta.title
})
export default router
