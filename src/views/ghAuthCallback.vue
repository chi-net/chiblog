<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onBeforeMount } from 'vue'
import mocksettings from '@/mocks/settings'
import { useStore } from 'vuex'
import sha256 from 'sha256'

const settings = ref({})
const commentInfo = ref({
  email: '',
  name: '',
  site: ''
})
const $route = useRoute()
const $router = useRouter()
const $store = useStore()
const ifQuery = ref(false)
const msg = ref('正在进行认证，请稍候......')

if ($store.state.model === 'production') {
  settings.value = $store.state.all.settings
} else {
  settings.value = mocksettings
}

async function getAccessToken () {
  return new Promise((resolve, reject) => {
    axios.post(settings.value.site.comment.ghauth.proxy_url, {
      code: $route.query.code,
      client_id: settings.value.site.comment.ghauth.client_id,
      client_secret: settings.value.site.comment.ghauth.client_secret
    }, {
      headers: {
        accept: 'application/json'
      }
    })
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}
let accessToken
async function getUserInfo () {
  return new Promise((resolve, reject) => {
    axios.get('https://api.github.com/user?t=' + (new Date().getTime()), {
      headers: {
        Authorization: 'token ' + accessToken
      }
    })
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

onBeforeMount(async () => {
  if ($route.query.code !== undefined && $route.query.code != null && $route.query.code !== '') {
    ifQuery.value = true
    try {
      // setTimeout(async () => {
      accessToken = (await getAccessToken()).data.access_token
      const userInfo = (await getUserInfo(accessToken)).data
      // console.log(userInfo)

      if (userInfo.blog.indexOf('http') === -1) {
        commentInfo.value.site = '//' + userInfo.blog
      } else {
        commentInfo.value.site = userInfo.blog
      }
      commentInfo.value.email = userInfo.email
      commentInfo.value.name = userInfo.name
      msg.value = '认证成功！正在跳转......'
      localStorage.setItem('commentServiceActived', 'true')
      localStorage.setItem('commentServiceData', btoa(JSON.stringify({
        data: btoa(JSON.stringify(commentInfo.value)),
        chk: sha256(JSON.stringify(commentInfo.value))
      })))
      const previousLink = localStorage.getItem('previous_link')
      console.log(previousLink)
      setTimeout(() => {
        const link = (previousLink !== null) ? previousLink : '/'
        $router.push(link)
      }, 2000)
      // }, 5000)
    } catch (e) {
      alert('出现错误！请重新尝试。Error: ' + e.message)
    }
    // console.log(accessToken)
  } else {
    $router.push('/error/404.html')
  }
})
</script>
<template>
  <div id="cb">
    <h1>{{ msg }}</h1>
    <!-- {{ commentInfo }} -->
  </div>
</template>
<style lang="less">
</style>
