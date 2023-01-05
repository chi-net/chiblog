<script setup>
import Comments from '@/components/Comments'
import Icon from '@/components/Icon'

import incposts from '@/mocks/posts'
import setting from '@/mocks/settings'
import mockcomments from '@/mocks/comments'

import { marked } from 'marked'
import { computed, ref } from 'vue'
// import { useStore } from '@/store'
import { useRouter } from 'vue-router'

const $route = useRoute()
const props = {
  path: $route.params.path
}
// const $store = useStore()
const $store = useAlldata()
const $router = useRouter()

console.log($store.value.all)
// data()
const post = ref({})
const posts = ref({})
const settings = ref({})
const comments = ref({})
const postComments = ref(0)
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
const isCN = computed(() => { return $store.value.isCN })
function checkCN () {
  if (isCN.value === true) {
    if (post.value.china === true) { // if in China? and post support china
      // console.log('in china')
      useHead({
        title: post.value.title + ' - ' + settings.value.site.title
      })
      if (process.client) document.title = post.value.title + ' - ' + settings.value.site.title
      china = true
    } else {
      china = false
    }
  } else { // abroad
    // console.log('abroad')
    useHead({
      title: post.value.title + ' - ' + settings.value.site.title
    })
    if (process.client) document.title = post.value.title + ' - ' + settings.value.site.title
  }
}

// mounted
if ($store.value.model === 'production') {
  posts.value = $store.value.all.posts
  settings.value = $store.value.all.settings
  comments.value = $store.value.all.comments
  postComments.value = comments.value.filter(comment => comment.to === props.pid).length
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
      <Icon name="comment"/>{{postComments}}
      <Icon name="book"/>{{(post.category !== undefined) ? post.category : '未分类'}}
    </h2>
    <div v-if="china">
      <div v-html="rcontent" id="content"></div>
      <p v-if="post.tags !== undefined" id="tags">
        <Icon name="tag"/><nuxt-link v-for="i in post.tags" :key="i" :to="'/tag/' + i" class="likea"><span>{{i}}</span>&nbsp;</nuxt-link>
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
.click {
  cursor: pointer;
}
// #post-container {
//   border-radius: 4px;
//   backdrop-filter: blur(5px);
//   border: 1px solid #000;
//   margin: 4px;
//   box-shadow: #eee 2px;
//   background-color: rgba(0,0,0,0);
//   padding: 2px;
// }
</style>
<style lang="less">
@import "../style/markdown.less";
a,a:hover,a:active,a:link {
  text-decoration: none;
  color: blue;
}
a:hover {
  color:cyan;
}
</style>
