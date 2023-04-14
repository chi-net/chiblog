<script setup>
import mockpages from '@/mocks/pages'

// import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// import { useStore } from '@/store'
import mocksettings from '../mocks/settings'

const $store = useAlldata()
const $route = useRoute()
const props = {
  path: $route.params.path
}
let page = {}
const settings = ref({})
const pages = ref({})
if ($store.value.model === 'production') {
  pages.value = $store.value.all.pages
  settings.value = $store.value.all.settings
} else {
  pages.value = mockpages
  settings.value = mocksettings
}
const $router = useRouter()
if (pages.value.find((page) => page.name === props.path) === undefined) {
  $router.push('/error/404.html')
} else {
  page = pages.value.find((page) => page.name === props.path)
  // console.log(settings.value)
  useHead({
    title: page.title + ' - ' + settings.value.site.title
  })
}
</script>
<template>
  <PureCard>
    <h1>{{page.title}}</h1>
    <Content :content="page.content?page.content:''"/>
  </PureCard>
</template>
