<script setup>
import mockposts from '@/mocks/posts'
import mocksettings from '@/mocks/settings'
import mockcomments from '@/mocks/comments'

// import { useStore } from '@/store'
// import { ref } from 'vue'
import { marked } from 'marked'
// import { useRouter } from 'vue-router'
// import { processExpression } from '@vue/compiler-core'
// import { useAlldata } from '~~/composables/useData'

// throw new Error('KFC crazy Thursday needs 50$')

// const $router = useRouter()

const $store = useAlldata()
const $route = useRoute()

// console.log($route.params.name)

// load will spare on some minutes
// const instance = getCurrentInstance()
// console.log($store.value)
// gh callback
// Keep clean!
// onMounted(() => {
//   const urlObj = new URL(location.href)
//   if (urlObj.searchParams.get('code') !== '' && urlObj.searchParams.get('code') !== null) {
//     // console.log(urlObj.searchParams.get('code'))
//     sessionStorage.setItem('code', urlObj.searchParams.get('code'))
//     // console.log(sessionStorage.getItem('code'))
//     window.history.replaceState({}, '', location.origin)
//   }
//   // console.log('jump!')
//   // jump to ghAuthCallback
//   if (sessionStorage.getItem('code') != null && sessionStorage.getItem('code') !== '') {
//     const code = sessionStorage.getItem('code')
//     // console.log(code)
//     sessionStorage.setItem('code', '')
//     $router.push({ path: '/ghauth/callback', query: { code: code } })
//   }
// })

// watch
// const isCN = watch(() => $store.isCN, () => { instance.proxy.$forceUpdate() })
let posts = reactive({})
let settings = reactive({})
let comments = reactive({})

if ($store.value.model === 'production') {
  posts = $store.value.all.posts
  settings = $store.value.all.settings
  comments = $store.value.all.comments
  useHead({
    // title: '文章列表 - ' + settings.site.title
    title: '分类"' + $route.params.name + '"' + '的文章 - ' + settings.site.title,
    meta: [
      {
        name: 'description',
        content: '分类"' + $route.params.name + '"' + '的文章 - ' + settings.site.title
      }
    ]
  })
} else {
  posts = mockposts
  settings = mocksettings
  comments = mockcomments
}
// console.log(posts)
posts = posts.filter((ele) => {
  if (ele.category !== undefined) {
    if (ele.category === $route.params.name) return true
    else return false
  }
})

posts.sort((a, b) => {
  if (a.updtime > b.updtime) return -1
  else if (a.updtime < b.updtime) return 1
  else return 0
})

// methods
// function ifcn (china) {
//   if ($store.isCN === true) {
//     if (china === true) { // if in China? and post support china
//       return true
//     } else {
//       return false
//     }
//   } else { // abroad
//     return true
//   }
// }
// if (process.browser) {
//   document.title =  '文章列表 - ' + settings.site.title
// }
</script>
<template>
  <div class="flex flex-col">
    <div v-html="marked.parse(settings.site.announcement)" id="announcement"></div>
    <div class="flex justify-center text-3xl p-2">
      <div class='flex'>
        <Icon name="book" width="36" height="36"/>
        {{ $route.params.name }}
      </div>
    </div>
    <div v-if="posts.length !== 0"  class="flex justify-center text-2xl">
      <div>{{ posts.length }}篇文章</div>
    </div>
    <div v-if="posts.length !== 0">
      <ArticleCard :posts="posts" :comments="comments" :settings="settings" />
    </div>
    <div v-else>
      <div>暂时没有含有这个分类的文章欸，<nuxt-link to="/">返回首页</nuxt-link>看看别的。</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#announcement {
  color: #ff4242;
  a:link,
  a:visited {
    color: black;
    text-decoration: none;
  }
  a:hover,
  a:active {
    color: cyan;
  }
  p {
    padding-left: 10px;
  }
}
</style>
