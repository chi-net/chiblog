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
    path: '/posts/:path',
    name: 'Articles',
    component: () => import('../views/Article.vue'),
    props: true,
    meta: {
      title: '文章 - ' + settings.site.title
    }
  },
  {
    path: '/mock2get/',
    name: 'Mock2Get',
    component: () => import('../views/mock2get.vue'),
    meta: {
      title: settings.site.title
    }
  },
  {
    path: '/:path',
    name: 'Pages',
    component: () => import('../views/Page.vue'),
    props: true,
    meta: {
      title: settings.site.title
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
  if (to.hash === '') {
    window.scrollTo(0, 0)
  } else {
    const hsh = to.hash.slice(1)
    const ele = document.getElementById(hsh).getBoundingClientRect()
    const x = ele.left + window.scrollX
    const y = ele.top + window.scrollY
    window.scrollTo({ left: x, top: y - 18 * 3 - 1, behavior: 'smooth' })
  }
  document.title = to.meta.title
})
export default router
