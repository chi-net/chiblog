<script setup>
import mockposts from '@/mocks/posts'
import mocksettings from '@/mocks/settings'
import mockcomments from '@/mocks/comments'

// import { useStore } from '@/store'
// import { ref } from 'vue'
import { marked } from 'marked'
import addMediaHeader from '~/scripts/addMediaHeader'
// import { useRouter } from 'vue-router'
// import { processExpression } from '@vue/compiler-core'
// import { useAlldata } from '~~/composables/useData'

// throw new Error('KFC crazy Thursday needs 50$')

// const $router = useRouter()

const $store = useAlldata()

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
  addMediaHeader(useHead,
    settings.site.title + ' - ' + settings.site.desc,
    settings.site.desc,
    settings.site.articleimage.enabled ? settings.site.articleimage.images[Math.floor(Math.random() * settings.site.articleimage.images.length)] : '',
    settings.site.author.name,
    settings.site.title
  )
} else {
  posts = mockposts
  settings = mocksettings
  comments = mockcomments
}
// console.log(posts)
posts.sort((a, b) => {
  if (a.updtime > b.updtime) return -1
  else if (a.updtime < b.updtime) return 1
  else return 0
})
</script>
<template>
  <div id="article-list">
    <div v-html="marked.parse(settings.site.announcement)" id="announcement"></div>
    <ArticleCard :posts="posts" :comments="comments" :settings="settings" />
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
