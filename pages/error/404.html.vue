<script setup>
import mocksettings from '@/mocks/settings'
import { ref } from 'vue'
import { useStore } from '@/store'

const settings = ref({})
const $store = useStore()

if ($store.model === 'production') {
  settings.value = $store.all.settings
  if (process.client) document.title = '你好像迷路了呢 - ' + settings.value.site.title
} else {
  settings.value = mocksettings
}

</script>
<template>
  <div>
    <img src="@/assets/404.png" title="七七-暗中观察-GenshinImpact"/>
    <h2>啊哦，看起来你好像迷路了呢......</h2>
    <h2><nuxt-link to="/">点我返回</nuxt-link></h2>
  </div>
</template>
<style scoped>
a:link,a:visited {
  color: black;
  text-decoration: none;
}
a:hover,a:active {
  color: cyan;
}
</style>
<style lang="less">

</style>
