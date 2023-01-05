<script setup>
import md5 from 'md5'
import mockcomments from '../mocks/comments'
import mockposts from '@/mocks/posts'
import mocksettings from '@/mocks/settings'
import { marked } from 'marked'
import { defineProps, ref, computed, onMounted } from 'vue'
// import { useStore } from '@/store'
// import { useRouter } from 'vue-router'
import sha256 from 'sha256'

const username = ref('')
const email = ref('')
const site = ref('')
const content = ref('')
const reply = ref(-1)

// const $store = useStore()
const $store = useAlldata()
// const $router = useRouter()

const props = defineProps({
  pid: Number
})
// data
const clist = ref([])
const comments = ref({})
const posts = ref({})
const settings = ref({})
const userData = ref({})

let authed = false
if (process.client) authed = computed(() => localStorage.getItem('commentServiceActived'))

if ($store.value.model === 'production') {
  posts.value = $store.value.all.posts
  settings.value = $store.value.all.settings
  comments.value = $store.value.all.comments
} else {
  posts.value = mockposts
  settings.value = mocksettings
  comments.value = mockcomments
}

comments.value.forEach(data => {
  data.content = String(data.content).replace(/</g, '&lt;')
  data.name = String(data.name).replace(/</g, '&lt;')
  data.site = String(data.site).replace(/</g, '&lt;')
  data.site = String(data.site).replace(/javascript:/g, '')
})

onMounted(async () => {
  if (settings.value.site.comment.backend.enabled === true) {
    if (settings.value.site.comment.backend.type === 'workers') {
      // const commentdata = (await getCommentData(settings.value.site.comment.backend.url)).data
      // console.log(commentdata)
      const resp = await fetch(settings.value.site.comment.backend.url + '?t=' + Math.floor(new Date().getTime() / 1000))
      const commentdata = await resp.json()
      comments.value = commentdata
      // console.log(comments.value)
      comments.value.forEach(data => {
        data.content = String(data.content).replace(/</g, '&lt;')
        data.name = String(data.name).replace(/</g, '&lt;')
        data.site = String(data.site).replace(/</g, '&lt;')
        data.site = String(data.site).replace(/javascript:/g, '')
      })
      clist.value = comments.value.filter(comment => comment.to === props.pid)
      clist.value.sort((a, b) => {
        if (a.time > b.time) return -1
        else if (a.time < b.time) return 1
        else return 0
      })
    }
  }
})

console.log(clist)
clist.value = comments.value.filter(comment => comment.to === props.pid)
clist.value.sort((a, b) => {
  if (a.time > b.time) return -1
  else if (a.time < b.time) return 1
  else return 0
})
if (process.client) {
  if (localStorage.getItem('commentServiceActived') === 'true') {
    if (localStorage.getItem('commentServiceData') !== null) {
      try {
        const comment = JSON.parse(decodeURIComponent(atob(localStorage.getItem('commentServiceData'))))
        // console.log(decodeURIComponent(atob(localStorage.getItem('commentServiceData'))))
        // console.log(comment)
        if (sha256(atob(comment.data)) === comment.chk) {
          userData.value = JSON.parse(decodeURIComponent(atob(comment.data)))
        } else {
          localStorage.setItem('commentServiceActived', 'false')
          throw new Error('The comment data is invalid!')
        }
      } catch (e) {
        console.log(e)
      }
    }
  } else {
    console.log('Not auth')
  }  
}

async function submitComment () {
  if (authed.value === 'true') {
    try {
      const data = new FormData()
      data.append('to', props.pid)
      data.append('name', userData.value.name)
      data.append('email', userData.value.email)
      data.append('site', userData.value.site)
      data.append('content', content.value)
      data.append('reply', reply.value)
      await fetch(settings.value.site.comment.commiturl + '?t=' + Math.floor(new Date().getTime() / 1000), { method: 'POST', body: data })
      alert('评论提交成功!')
      location.reload()
    } catch (e) {
      alert('评论提交出现错误!')
    }
  } else {
    try {
      const data = new FormData()
      data.append('to', props.pid)
      data.append('name', username.value)
      data.append('email', email.value)
      data.append('site', site.value)
      data.append('content', content.value)
      data.append('reply', reply.value)
      await fetch(settings.value.site.comment.commiturl + '?t=' + Math.floor(new Date().getTime() / 1000), { method: 'POST', body: data })
      alert('评论提交成功!')
      location.reload()
    } catch (e) {
      alert('评论提交出现错误!')
    }
  }
}

function goGithubAuth () {
  window.open('https://github.com/login/oauth/authorize?client_id=' + settings.value.site.comment.ghauth.client_id)
  localStorage.setItem('previous_link', location.hash.slice(1))
}

function Logout () {
  localStorage.setItem('commentServiceData', '')
  localStorage.setItem('commentServiceActived', 'false')
  location.reload()
}

function replyCommentSet (id) {
  reply.value = id
}

function getCommenterAvatar (i) {
  const gcache = (settings.value.site.comment.avatar.cacheurl === undefined) ? 'https://secure.gravatar.com/avatar/' : settings.value.site.comment.avatar.cacheurl
  const ghcache = (settings.value.site.comment.avatar.ghcacheurl === undefined) ? 'https://avatars.githubusercontent.com/u/' : settings.value.site.comment.avatar.ghcacheurl
  if (i.email.includes('#ghavatar:')) return ghcache + i.email.slice(10) + '?v=' + Math.round(Math.random() * 10)
  return gcache + md5(i.email) + '?s=64&' + 'd=' + settings.value.site.comment.avatar.d + '&r=g'
}

let vw50 = false
if ((new Date()).getDate() === 3 && (Math.random * 1000) < 6) {
  // KFC Crazy Thursday needs 50$(
  vw50 = true
}

console.log(clist)
</script>
<template>
  <div id="comments">
    <!-- {{props.pid}}
    {{(posts.filter(post => post.id === props.pid)[0]).comment}} -->
    <h2 v-if="vw50">
      Whoops, this service is unavailable.<br/>
      chihuo2104 needs 50$ to contiune because today is KFC crazy Thursday(<br/>
      您欧啊，这个彩蛋的触发概率才0.6%,快打开ys抽个卡(
    </h2>
    <h2 v-else>
      <h2 v-if="clist.length !== 0">已有{{clist.length}}条评论</h2>
      <h2 v-else>没有评论</h2>
      <div id="release-comment" v-if="(settings.site.comment.enabled && (posts.filter(post => post.id === props.pid)[0]).comment)">
        <h3 v-if="reply === -1">发表评论(支持Markdown语法)</h3>
        <h3 v-else>回复<nuxt-link class="reply" :to="{hash: '#comments-' + reply}">{{clist.filter(comment => comment.id === reply)[0].name}}</nuxt-link>:</h3>
        <div id="comment-service" v-if="settings.site.comment.ghauth.enabled && authed !== 'true'">
          <h2>请先经过GitHub认证后发表评论！</h2>
          <button id="comment-authenation" @click="goGithubAuth()">点我认证</button>
        </div>
        <div id="comment-noservice" v-else-if="!settings.site.comment.ghauth.enabled">
          <input v-model="username" placeholder="名称" type="text" class="inputs" required/>
          <input v-model="email" placeholder="邮箱" type="email" class="inputs" required/>
          <input v-model="site" placeholder="个人网站(可选)" type="url" class="inputs" required/>
          <textarea v-model="content" placeholder="输入评论内容(支持Markdown语法)" class="inputs" required></textarea>
          <button @click="submitComment()">提交评论</button>
        </div>
        <div id="comment-service-authed" v-else-if="authed === 'true'">
          <div id="comment-service-hello">欢迎你，{{userData.name}}!<a @click="Logout()" class="out">点我退出</a></div>
          <textarea v-model="content" placeholder="输入评论内容(支持Markdown语法)" class="input-tx" required></textarea>
          <button @click="submitComment()" class="input-tx">提交评论</button>
        </div>
      </div>
      <div v-else-if="!settings.site.comment.enabled">
        <h3>抱歉，本站关闭了评论功能。</h3>
      </div>
      <div v-else-if="!posts.filter(post => post.id === props.pid).comment">
        <h3>抱歉，本文章关闭了评论功能。</h3>
      </div>
      <div id="comment-in" v-for="i in clist" :key="i.id">
        <div :id="'comments-' + i.id">
          <img :src="getCommenterAvatar(i)" :alt="'the avatar of' + i.name" class="commenter-avatar"/>
          <a :href="i.site" target="_blank" class="likeh3">{{ i.name }}</a>
          <span class="likeh3">于{{(new Date(i.time * 1000)).toLocaleString()}}
          <span v-if="i.reply === -1">评论道</span>
          <span v-else>回复<nuxt-link class="reply" :to="{hash: '#comments-' + i.reply}">{{comments.filter(comment => comment.id === i.reply)[0].name}}</nuxt-link></span>&nbsp;</span>
          <a id="reply-click" class="out" @click="replyCommentSet(i.id)">回复评论</a>
          <div v-html="marked.parse(i.content)" class="comments-content"></div>
        </div>
      </div>
    </h2>
  </div>
</template>
<style lang="less" scoped>
a,a:visited {
  color: blue;
  text-decoration: none;
}
a:hover,a:active {
  color: cyan;
  text-decoration: none;
}
.out {
  cursor: pointer;
}
@base: 15px;
.likeh3 {
  font-size: 1.2 * @base;
}
h1 {
  font-size: 2 * @base;
}
h2 {
  font-size: 1.8 * @base;
}
h3 {
  font-size: 1.5 * @base;
}
a,p {
  font-size: 1.2 * @base;
}
.commenter-avatar {
  @media screen and (max-width: 768px) {
    max-width: 25%;
  }
  @media screen and (min-width: 768px) {
    width: 64px;
    height: 64px;
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

.input-tx {
  width: 100%;
  margin: 0px;
}

#comment-service-authed {
  margin: 0px;
  padding: 0px;
}

#comment-noservice {
  display: flex;
  flex-direction: column;
}
</style>
<style lang="less">
@import "@/style/markdown.less";
</style>
