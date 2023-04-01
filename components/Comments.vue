<script setup>
// import md5 from 'md5'
// import mockcomments from '../mocks/comments'
import mockposts from '@/mocks/posts'
import mocksettings from '@/mocks/settings'
// import { defineProps, ref, computed, onMounted } from 'vue'
// import { useStore } from '@/store'
// import { useRouter } from 'vue-router'
// import sha256 from 'sha256'
// const $store = useStore()
const $store = useAlldata()
// const $router = useRouter()

const props = defineProps({
  pid: Number
})
// data
const posts = ref({})
const settings = ref({})

if ($store.value.model === 'production') {
  posts.value = $store.value.all.posts
  settings.value = $store.value.all.settings
} else {
  posts.value = mockposts
  settings.value = mocksettings
}

let vw50 = false
if ((new Date()).getDate() === 3 && (Math.random * 1000) < 6) {
  // KFC Crazy Thursday needs 50$(
  vw50 = true
}

// console.log(clist)
</script>
<template>
  <div id="comments">
    <h2 v-if="vw50">
      Whoops, this service is unavailable.<br/>
      chihuo2104 needs 50$ to contiune because today is KFC crazy Thursday(<br/>
      您欧啊，这个彩蛋的触发概率才0.6%,快打开ys抽个卡(
    </h2>
    <div v-if="settings.site.comment.backend.type === 'valine'"><LazyCommentSysValine :appid="settings.site.comment.backend.appid" :appkey="settings.site.comment.backend.appkey" :path="(settings.site.comment.backend.start === '')?'chiblog-posts-' + props.pid: settings.site.comment.backend.start + 'chiblog-posts-' + props.pid" :avatar="settings.site.comment.avatar.d"></LazyCommentSysValine></div>
  </div>
</template>