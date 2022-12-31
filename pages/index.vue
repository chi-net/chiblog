<script setup>
import mockposts from '@/mocks/posts'
import mocksettings from '@/mocks/settings'
import mockcomments from '@/mocks/comments'

import Icon from '@/components/Icon.vue'

import { useStore } from '@/store'
import { ref } from 'vue'
import { marked } from 'marked'
import { useRouter } from 'vue-router'

// throw new Error('KFC crazy Thursday needs 50$')

const $router = useRouter()
const $store = useStore()
// const instance = getCurrentInstance()

// gh callback
// Keep clean!
onMounted(() => {
  const urlObj = new URL(location.href)
  if (urlObj.searchParams.get('code') !== '' && urlObj.searchParams.get('code') !== null) {
    // console.log(urlObj.searchParams.get('code'))
    sessionStorage.setItem('code', urlObj.searchParams.get('code'))
    // console.log(sessionStorage.getItem('code'))
    window.history.replaceState({}, '', location.origin)
  }
  // console.log('jump!')
  // jump to ghAuthCallback
  if (sessionStorage.getItem('code') != null && sessionStorage.getItem('code') !== '') {
    const code = sessionStorage.getItem('code')
    console.log(code)
    sessionStorage.setItem('code', '')
    $router.push({ name: 'ghAuthCallback', query: { code: code } })
  }  
})

// watch
// const isCN = watch(() => $store.isCN, () => { instance.proxy.$forceUpdate() })
const posts = ref({})
const settings = ref({})
const comments = ref({})

if ($store.model === 'production') {
  posts.value = $store.all.posts
  settings.value = $store.all.settings
  comments.value = $store.all.comments
  if (process.client) document.title = '文章列表 - ' + settings.value.site.title
} else {
  posts.value = mockposts
  settings.value = mocksettings
  comments.value = mockcomments
}
// console.log(posts.value)
posts.value.sort((a, b) => {
  if (a.updtime > b.updtime) return -1
  else if (a.updtime < b.updtime) return 1
  else return 0
})

function renderTime (time) {
  const currentTime = new Date()
  const relTime = new Date(time * 1000)
  const offset = Math.floor((currentTime.getTime() - relTime.getTime()) / 1000)
  if (offset < 60 && offset > 0) {
    return offset + '秒前'
  } else if (offset > 60 && offset < 60 * 60) {
    return Math.floor(offset / 60) + '分钟前'
  } else if (offset > 60 * 60 && offset < 60 * 60 * 24) {
    return Math.floor(offset / (60 * 60)) + '小时前'
  } else if (offset > 60 * 60 * 24 && offset < 60 * 60 * 24 * 30) {
    return Math.floor(offset / (60 * 60 * 24)) + '天前'
  } else if (offset > 60 * 60 * 24 * 30 && offset < 60 * 60 * 24 * 30 * 12) {
    return Math.floor(offset / (60 * 60 * 24 * 30)) + '个月前'
  } else if (offset > 60 * 60 * 24 * 30 * 12 && offset < 60 * 60 * 24 * 30 * 12 * 3) {
    return Math.floor(offset / (60 * 60 * 24 * 30 * 12)) + '年前'
  } else {
    return relTime.getFullYear() + '-' + (relTime.getMonth() + 1) + '-' + relTime.getDate()
  }
}
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
</script>
<template>
  <div id="article-list">
    <div v-html="marked.parse(settings.site.announcement)" id="announcement"></div>
    <h2>文章列表</h2>
    <!-- <h2 v-if="isCN">由于您目前位于中国大陆地区，为符合中国大陆的法律法规，已将部分内容进行隐藏。<br/><small>如果您已经确定您正在使用非中国大陆IP访问，请刷新页面并等待5-10秒......</small></h2> -->
    <div v-for="i in posts" :key="i.id">
      <div class="article" :id="'posts-' + i.id">
        <h3 :id="'posts-title-' + i.id"><nuxt-link :to="'/posts/' + i.path">{{i.title}}</nuxt-link></h3>
        <Icon name="account"/>{{i.author}}&nbsp;
        <Icon name="clockoutline"/>{{renderTime(i.time)}}&nbsp;
        <Icon name="accountarrowup"/>{{renderTime(i.updtime)}}&nbsp;
        <Icon name="comment"/>{{comments.filter(comment => comment.to === i.id).length}}
        <Icon name="book"/>{{(i.category !== undefined)? i.category : '未分类'}}
        <div :id="'posts-desc' + i.id">{{(i.desc !== undefined)? i.desc : '本文章未提供摘要。'}}</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
a:link,a:visited {
  color: black;
  text-decoration: none;
}
a:hover,a:active {
  color: cyan;
}
#announcement {
  color: #ff4242;
}
#announcement p {
  padding-left: 10px;
}
.article {
  border-radius: 4px;
  backdrop-filter: blur(5px);
  border: 1px solid #000;
  margin: 4px;
  box-shadow: #eee 2px;
  background-color: rgba(0,0,0,0);
  padding: 2px;
  h1 {
    margin: 1px;
  }
}
</style>
