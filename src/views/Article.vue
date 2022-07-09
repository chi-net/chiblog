<script setup>
import Comments from '@/components/Comments'

import incposts from '@/mocks/posts'
import setting from '@/mocks/settings'

import { marked } from 'marked'
import { defineProps, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const props = defineProps({
  path: String
})
const $store = useStore()
const $router = useRouter()

// data()
const post = ref({})
const posts = ref({})
const settings = ref({})
let china = false

// computed()
const rcontent = computed(() => { return marked.parse(post.value.content) })
const reltime = computed(() => { return (new Date(post.value.time * 1000).toLocaleString()) })
const isCN = computed(() => { return $store.state.isCN })

// methods
const checkCN = () => {
  if (isCN.value === true) {
    if (post.value.china === true) { // if in China? and post support china
      // console.log('in china')
      document.title = post.value.title + ' - ' + settings.value.site.title
      china = true
    } else {
      china = false
    }
  } else { // abroad
    // console.log('abroad')
    document.title = post.value.title + ' - ' + settings.value.site.title
    china = true
  }
}

console.log($store.state)
// mounted
if ($store.state.model === 'production') {
  posts.value = $store.state.all.posts
  settings.value = $store.state.all.settings
} else {
  posts.value = incposts
  settings.value = setting
}
if (posts.value.find(post => post.path === props.path) === undefined) {
  $router.push({ path: '/error/404.html' })
} else {
  const a = posts.value.find(post => post.path === props.path)
  post.value.author = a.author
  post.value.china = a.china
  post.value.content = a.content
  post.value.title = a.title
  post.value.path = a.path
  post.value.name = a.name
  post.value.time = a.time
  post.value.id = a.id
  checkCN()
}
</script>
<template>
  <div v-if="china">
    <h1>{{post.title}}</h1>
    <h2>{{post.author}}于{{reltime}}发布</h2>
    <div v-html="rcontent" id="content"></div>
    <hr/>
    <div id="comments">
      <Comments :pid="post.id"></Comments>
    </div>
  </div>
  <div v-else>
    <h1>由于您目前位于中国大陆地区，为符合中国大陆的法律法规，本文章已经被隐藏，暂时无法显示。<br/><small>如果您已经确定您正在使用非中国大陆IP访问，请刷新页面并等待5-10秒......</small></h1>
  </div>
</template>
<style lang="less" scoped>
#content img {
  width: 100%;
}
</style>
<style lang="less">

</style>
