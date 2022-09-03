<script setup>
import md5 from 'md5'
import mockcomments from '../mocks/comments'
import mockposts from '@/mocks/posts'
import mocksettings from '@/mocks/settings'
import axios from 'axios'
import { marked } from 'marked'
import { defineProps, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import sha256 from 'sha256'

const username = ref('')
const email = ref('')
const site = ref('')
const content = ref('')
const reply = ref(-1)

const $store = useStore()

const props = defineProps({
  pid: Number
})
// data
const clist = ref([])
const comments = ref({})
const posts = ref({})
const settings = ref({})
const userData = ref({})

const authed = computed(() => localStorage.getItem('commentServiceActived'))

if ($store.state.model === 'production') {
  posts.value = $store.state.all.posts
  settings.value = $store.state.all.settings
  comments.value = $store.state.all.comments
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

async function getCommentData (commenturl) {
  return new Promise((resolve, reject) => {
    axios.get(commenturl)
      .then(data => resolve(data))
      .then(err => reject(err))
  })
}

onMounted(async () => {
  if (settings.value.site.comment.backend.enabled === true) {
    if (settings.value.site.comment.backend.type === 'workers') {
      const commentdata = (await getCommentData(settings.value.site.comment.backend.url)).data
      // console.log(commentdata)
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

async function submitComment () {
  if (authed.value === 'true') {
    axios.post(settings.value.site.comment.commiturl, {
      to: props.pid,
      name: userData.value.name,
      email: userData.value.email,
      site: userData.value.site,
      content: content.value,
      reply: reply.value
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        alert('评论提交成功!')
        location.reload()
      })
      .catch(() => {
        alert('评论提交出现错误!')
      })
  } else {
    axios.post(settings.value.site.comment.commiturl, {
      to: props.pid,
      name: username.value,
      email: email.value,
      site: site.value,
      content: content.value,
      reply: reply.value
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => {
        alert('评论提交成功!')
        location.reload()
      })
      .catch(() => {
        alert('评论提交出现错误!')
      })
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

let vw50 = false
if ((new Date()).getDate() === 3 && (Math.random * 1000) < 6) {
  // KFC Crazy Thursday needs 50$(
  vw50 = true
}

console.log(clist)
</script>
<template>
  <div>
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
        <h3 v-else>回复<router-link class="reply" :to="{hash: '#comments-' + reply}">{{clist.filter(comment => comment.id === reply).name}}</router-link>:</h3>
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
      <div v-else-if="!posts[props.pid - 1].comment">
        <h3>抱歉，本文章关闭了评论功能。</h3>
      </div>
      <div id="comment-in" v-for="i in clist" :key="i.id">
        <div :id="'comments-' + i.id">
          <img :src="settings.site.comment.avatar.cacheurl + md5(i.email) + '?s=64&' + 'd=' + settings.site.comment.avatar.d +'&r=g'" :alt="'the avatar of' + i.name" class="commenter-avatar"/>
          <a :href="i.site" target="_blank" class="likeh3">{{ i.name }}</a>
          <span class="likeh3">于{{(new Date(i.time * 1000)).toLocaleString()}}
          <span v-if="i.reply === -1">评论道</span>
          <span v-else>回复<router-link class="reply" :to="{hash: '#comments-' + i.reply}">{{comments[i.reply - 1].name}}</router-link></span></span>
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
.likeh3 {
  font-size: 1.2em;
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

</style>
