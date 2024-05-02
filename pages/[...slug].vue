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
  <div class="flex flex-col py-10">
    <div class="flex justify-center">
      <img src="@/assets/notfound.png" title="七七-不在" class="w-32"/>
    </div>
    <div class="flex justify-center">
      <div class="text-3xl p-2">啊哦，看起来你好像迷路了呢......</div>
    </div>
    <div class="flex justify-center">
      <div class="text-2xl p-2"><a href="/">点我返回主页</a></div>
    </div>
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
