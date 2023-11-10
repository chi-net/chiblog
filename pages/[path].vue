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
let settings = reactive({})
let pages = reactive({})
if ($store.value.model === 'production') {
  pages = $store.value.all.pages
  settings = $store.value.all.settings
} else {
  pages = mockpages
  settings = mocksettings
}
const $router = useRouter()
if (pages.find((page) => page.name === props.path) === undefined) {
  $router.push('/error/404.html')
} else {
  page = pages.find((page) => page.name === props.path)
  if (page.type === 'link') $router.push('/error/404.html')
  // console.log(settings)
  useHead({
    title: page.title + ' - ' + settings.site.title,
    meta: [
      {
        name: 'description',
        content: '博客"' + settings.site.title + '"上的页面:' + page.title
      }
    ]
  })
}
</script>
<template>
  <PureCard>
    <h1 class="text-2xl font-bold">{{ page.title }}</h1>
    <Content :content="page.content ? page.content : ''" />
  </PureCard>
  <PureCard id="page-comments" v-if="page.comment !== undefined ? page.comment : false">
    <!-- <h2>在{{page.title}}下方评论：</h2> -->
    <Comments :pid="'pages-' + page.id" />
  </PureCard>
</template>
