<script setup>
import mocksettings from '@/mocks/settings'
// import { ref } from 'vue'
// import { useStore } from '@/store'

let settings = reactive({})
// const $store = useStore()
const $store = useAlldata()

if ($store.value.model === 'production') {
  settings = $store.value.all.settings
  useHead({
    title: '你好像迷路了呢 - ' + settings.site.title
  })
} else {
  settings = mocksettings
}
</script>
<template>
  <div>
    <img src="@/assets/notfound.png" title="七七-不在" />
    <h2>啊哦，看起来你好像迷路了呢......</h2>
    <h2><nuxt-link to="/">点我返回</nuxt-link></h2>
  </div>
</template>
<style scoped>
a:link,
a:visited {
  color: black;
  text-decoration: none;
}
a:hover,
a:active {
  color: cyan;
}
</style>
<style></style>
