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
const posts = ref({})
const settings = ref({})
const comments = ref({})

if ($store.value.model === 'production') {
  posts.value = $store.value.all.posts
  settings.value = $store.value.all.settings
  comments.value = $store.value.all.comments
  useHead({
    // title: '文章列表 - ' + settings.value.site.title
    title: '含有标签"' + $route.params.name + '"' + '的文章 - ' + settings.value.site.title,
    meta: [
      {
        name: 'description',
        content: '含有标签"' + $route.params.name + '"' + '的文章 - ' + settings.value.site.title
      }
    ]
  })
} else {
  posts.value = mockposts
  settings.value = mocksettings
  comments.value = mockcomments
}
// console.log(posts.value)
posts.value = posts.value.filter((ele) => {
  if (ele.tags !== undefined) {
    let have = false
    ele.tags.forEach((element) => {
      if (element === $route.params.name) have = true
    })
    if (have) return true
    else return false
  }
})

posts.value.sort((a, b) => {
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
//   document.title =  '文章列表 - ' + settings.value.site.title
// }
</script>
<template>
  <div id="article-list">
    <div v-html="marked.parse(settings.site.announcement)" id="announcement"></div>
    <!-- <h2>文章列表</h2> -->
    <h2><Icon name="tag" />{{ $route.params.name }}</h2>
    <div v-if="posts.length !== 0">
      <h3>{{ posts.length }}篇文章</h3>
      <ArticleCard :posts="posts" :comments="comments" :settings="settings" />
    </div>
    <div v-else>
      <h3>暂时没有含有这个标签的文章诶，<nuxt-link to="/">返回首页</nuxt-link>看看别的。</h3>
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
