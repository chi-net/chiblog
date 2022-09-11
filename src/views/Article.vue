<script setup>
import Comments from '@/components/Comments'
import Icon from '@/components/Icon'

import incposts from '@/mocks/posts'
import setting from '@/mocks/settings'
import mockcomments from '@/mocks/comments'

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
const comments = ref({})
let china = false

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
const isCN = computed(() => { return $store.state.isCN })
function checkCN () {
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

// mounted
if ($store.state.model === 'production') {
  posts.value = $store.state.all.posts
  settings.value = $store.state.all.settings
  comments.value = $store.state.all.comments
} else {
  posts.value = incposts
  settings.value = setting
  comments.value = mockcomments
}
if (posts.value.find(post => post.path === props.path) === undefined) {
  $router.push({ path: '/error/404.html' })
} else {
  const a = posts.value.find(post => post.path === props.path)
  post.value = a
  checkCN()
}
// computed()
const rcontent = computed(() => { return marked.parse(post.value.content) })
const reltime = computed(() => { return (renderTime(post.value.time)) })
const updtime = computed(() => { return (renderTime(post.value.updtime)) })

</script>
<template>
  <div id="post-container">
    <h1>{{post.title}}</h1>
    <h2>
      <Icon name="account"/>{{post.author}}&nbsp;
      <Icon name="clockoutline"/>{{reltime}}
      <Icon name="accountarrowup"/>{{updtime}}
      <Icon name="comment"/>{{comments.filter(comment => comment.to === props.pid).length}}
      <Icon name="book"/>{{(post.category !== undefined) ? post.category : '未分类'}}
    </h2>
    <div v-if="china">
      <div v-html="rcontent" id="content"></div>
      <p v-if="post.tags !== undefined" id="tags">
        <Icon name="tag"/><span v-for="i in post.tags" :key="i"><span>{{i}}</span>&nbsp;</span>
      </p>
      <p v-else>
        <Icon name="tag"/>没有标签！
      </p>
      <hr/>
      <div id="comments">
        <Comments :pid="post.id"/>
      </div>
    </div>
    <div v-else>
      <h1>由于您目前位于中国大陆地区，为符合中国大陆的法律法规，本文章已经被隐藏，暂时无法显示。<br/>
      <small>如果您已经确定您正在使用非中国大陆IP访问，请刷新页面并等待5-10秒......</small></h1>
    </div>
  </div>

</template>
<style lang="less" scoped>
#content img {
  width: 100%;
}
</style>
<style lang="less">
@import "../style/markdown.less";
</style>
