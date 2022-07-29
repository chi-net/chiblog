<!-- eslint-disable no-unreachable -->
<script setup>
import mockposts from '../mocks/posts'
import mocksettings from '@/mocks/settings'

import { useStore } from 'vuex'
import { watch, getCurrentInstance, ref } from 'vue'
import { marked } from 'marked'
import { useRouter } from 'vue-router'

// throw new Error('KFC crazy Thursday needs 50$')

const $router = useRouter()
const $store = useStore()
const instance = getCurrentInstance()

// gh callback
// Keep clean!
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

// watch
const isCN = watch(() => $store.state.isCN, () => { instance.proxy.$forceUpdate() })

const posts = ref({})
const settings = ref({})

if ($store.state.model === 'production') {
  posts.value = $store.state.all.posts
  settings.value = $store.state.all.settings
  document.title = '文章列表 - ' + settings.value.site.title
} else {
  posts.value = mockposts
  settings.value = mocksettings
}
console.log(posts.value)
posts.value.sort((a, b) => {
  if (a.time > b.time) return -1
  else if (a.time < b.time) return 1
  else return 0
})
console.log(posts.value)
// methods
function ifcn (china) {
  if ($store.state.isCN === true) {
    if (china === true) { // if in China? and post support china
      return true
    } else {
      return false
    }
  } else { // abroad
    return true
  }
}
</script>
<template>
  <div id="article-list">
    <h2>文章列表</h2>
    <div v-html="marked.parse(settings.site.announcement)" id="announcement"></div>
    <h2 v-if="isCN">由于您目前位于中国大陆地区，为符合中国大陆的法律法规，已将部分内容进行隐藏。<br/><small>如果您已经确定您正在使用非中国大陆IP访问，请刷新页面并等待5-10秒......</small></h2>
    <ol>
      <div v-for="i in posts" :key="i.id">
        <div class="article" v-if="ifcn(i.china)"><li><router-link :to="'/posts/' + i.path">{{i.title}}</router-link></li></div>
      </div>
    </ol>
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
</style>
