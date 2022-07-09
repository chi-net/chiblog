<script setup>
import mockpages from '@/mocks/pages'

import { marked } from 'marked'
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const $store = useStore()
const props = defineProps({
  path: String
})
let page = {}
const pages = ref({})
if ($store.state.model === 'production') {
  pages.value = $store.state.all.pages
} else {
  pages.value = mockpages
}
const $router = useRouter()
if (pages.value.find((page) => page.name === props.path) === undefined) {
  $router.push('/error/404.html')
} else {
  page = pages.value.find((page) => page.name === props.path)
}
</script>
<template>
  <div>
    <h1>{{page.title}}</h1>
    <div id="page-content" v-html="marked.parse(page.content)"></div>
  </div>
</template>
<style lang="less" scoped>
</style>
<style lang="less">

</style>
