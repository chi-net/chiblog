<script setup>
import { marked } from 'marked'
// import { onMounted } from 'vue';
const props = defineProps({
  content: String // content for the article
})

onMounted(() => {
  if ('IntersectionObserver' in window) {
    const content = document.querySelector('#content')
    const img = content.querySelectorAll('img')
    img.forEach((ele) => {
      ele.dataset.src = ele.src
      ele.src = '/loading.svg'
      ele.classList.add('lazy')
    })
    const lazyloadImages = document.querySelectorAll('.lazy')
    var imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = new Image()
          img.src = entry.target.dataset.src
          img.onload = () => {
            var image = entry.target
            image.style.opacity = 0
            setTimeout(() => {
              image.style.opacity = 1
              image.classList.remove('lazy')
              imageObserver.unobserve(image)
              image.src = image.dataset.src
            }, 400)
          }
        }
      })
    })

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image)
    })
  }
})
</script>
<template>
  <div id="content" v-html="marked.parse(props.content)"></div>
</template>
<style lang="scss">
@import '../styles/markdown.scss';
// @import '../styles/cardback.scss';
// img{
//   @media screen and (max-width: 768px) {
//     max-width: 100%;
//   }
//   @media screen and (min-width: 768px) {
//     max-width: 50%;
//   }
// }
</style>
