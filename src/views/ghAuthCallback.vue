<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'
import mocksettings from '@/mocks/settings'
import { useStore } from 'vuex'

const settings = ref({})
const $route = useRoute()
const $router = useRouter()
const $store = useStore()
const ifQuery = ref(false)

if ($store.state.model === 'production') {
  settings.value = $store.state.all.settings
} else {
  settings.value = mocksettings
}

async function getAccessToken () {
  return new Promise((resolve, reject) => {
    axios.post('https://github.com/login/oauth/access_token', {
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

if ($route.query.code !== undefined && $route.query.code != null && $route.query.code !== '') {
  ifQuery.value = true
  let accessToken
  try {
    accessToken = (await getAccessToken()).data.access_token
  } catch (e) {
    alert('出现错误！请重新尝试。Error: ' + e.message)
  }
  console.log(accessToken)
} else {
  $router.push('/error/404.html')
}
</script>
<template>
  <div id="cb" v-if="ifQuery.value">
    <h1>正在进行认证，请稍候......</h1>
  </div>
</template>
<style lang="less">
</style>
