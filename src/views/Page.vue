<script setup>
import pages from '@/mocks/pages'

import { marked } from 'marked'
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  path: String
})
let page = {
}
const $router = useRouter()
if (pages.find((page) => page.name === props.path) === undefined) {
  $router.push('/error/404.html')
} else {
  page = pages.find((page) => page.name === props.path)
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
