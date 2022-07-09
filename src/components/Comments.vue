<script setup>
import md5 from 'md5'
import mockcomments from '../mocks/comments'
import mockposts from '@/mocks/posts'
import { marked } from 'marked'
import { defineProps, ref } from 'vue'
import mocksettings from '@/mocks/settings'
import { useStore } from 'vuex'

const $store = useStore()

const props = defineProps({
  pid: Number
})
// data
let clist = []
const comments = ref({})
const posts = ref({})
const settings = ref({})
if ($store.state.model === 'production') {
  posts.value = $store.state.all.posts
  settings.value = $store.state.all.settings
  comments.value = $store.state.all.comments
} else {
  posts.value = mockposts
  settings.value = mocksettings
  comments.value = mockcomments
}
clist = comments.value.filter(comment => comment.to === props.pid)
let username, email, site

</script>
<template>
  <div>
    <h2 v-if="clist.length !== 0">已有{{clist.length}}条评论</h2>
    <h2 v-else>没有评论</h2>
    <div id="release-comment" v-if="(settings.site.comment.enabled && posts[props.pid - 1].comment)">
      <h3>发表评论(支持Markdown语法)</h3>
      <input v-model="username" placeholder="名称" type="text" class="inputs"/>
      <input v-model="email" placeholder="邮箱" type="email" class="inputs"/>
      <input v-model="site" placeholder="个人网站(可选)" type="url" class="inputs"/>
      <textarea v-model="content" placeholder="输入评论内容(支持Markdown语法)" class="inputs"></textarea>
      <button @click="submitComment()">提交评论</button>
    </div>
    <div v-else-if="!settings.site.comment.enabled">
      <h3>抱歉，本站关闭了评论功能。</h3>
    </div>
    <div v-else-if="!posts[props.pid - 1].comment">
      <h3>抱歉，本文章关闭了评论功能。</h3>
    </div>
    <div id="comment-in" v-for="i in clist" :key="i.id">
      <div :id="'comments-' + i.id">
        <img :src="'//g.chicdn.cn/avatar/' + md5(i.email) + '?s=96&d=monsterid&r=g'" :alt="'the avatar of' + i.name" class="commenter-avatar"/>
        &nbsp;<a :href="i.site" target="_blank" class="likeh3">{{ i.name }}</a>
        <span class="likeh3">于{{(new Date(i.time * 1000)).toLocaleString()}}
        <span v-if="i.reply === -1">评论道</span>
        <span v-else>回复<router-link class="reply" :to="{hash: '#comments-' + i.reply}">{{comments[i.reply - 1].name}}</router-link></span></span>
        <!-- {{i}} -->
        <div v-html="marked.parse(i.content)" class="comments-content"></div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
a,a:visited {
  color: black;
  text-decoration: none;
}
a:hover,a:active {
  color: cyan;
  text-decoration: none;
}
.likeh3 {
  font-size: 1.5em;
}
.commenter-avatar {
  @media screen and (max-width: 768px) {
    max-width: 25%;
  }
}
.comments-content img {
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    width: 50%;
  }
}
.reply {
  display: inline;
}
#release-comment {
  display: flex;
  flex-direction: column;
}
</style>
<style lang="less">

</style>
