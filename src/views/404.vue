<script setup>
import mocksettings from '@/mocks/settings'
import { ref } from 'vue'
import { useStore } from 'vuex'

const settings = ref({})
const $store = useStore()

if ($store.state.model === 'production') {
  settings.value = $store.state.all.settings
  document.title = '你好像迷路了呢 - ' + settings.value.site.title
} else {
  settings.value = mocksettings
}

</script>
<template>
  <div>
    <img src="@/assets/404.png" title="七七-暗中观察-GenshinImpact"/>
    <h2>啊哦，看起来你好像迷路了呢......</h2>
    <h2><router-link to="/">点我返回</router-link></h2>
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
