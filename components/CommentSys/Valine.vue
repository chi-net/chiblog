<script setup>
const $valine = useNuxtApp().vueApp.config.globalProperties.$valine
// import valine from 'valine'
const props = defineProps({
  appid: String,
  appkey: String,
  path: String,
  avatar: String
})

// new $valine({
//   appId: props.appid,
//   appKey: props.appkey,
//   path: props.path,
//   el: '#valine-comment',
//   avatar: props.avatars
// })
onMounted(() => {
  // $loadValine(props.appid, props.appkey, props.path, props.avatar)
  if (process.client) {
    // const element = document.createElement('script')
    //   element.src = 'https://cdn.jsdelivr.net/gh/xcss/valine@1.5.1/dist/Valine.min.js'
    //   element.async = true
    //   document.head.appendChild(element)
      // element.onload = () => {
        new $valine({
          appId: props.appid,
          appKey: props.appkey,
          path: props.path,
          el: '#valine-comment',
          avatar: props.avatars
        })        
      // }
    // valine loop
    // let i = setInterval(() => {
    //   if (typeof valine !== undefined) {
    //     new valine({
    //       appId: props.appid,
    //       appKey: props.appkey,
    //       path: props.path,
    //       el: '#valine-comment',
    //       avatar: props.avatars
    //     })
    //     clearInterval(i)
    //   }
    // }, 100)
  }
})

</script>
<template>
  <div id="valine-comment">
  </div>
</template>