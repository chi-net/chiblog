<script setup>
// just for article
// import { defineProps, ref, onMounted } from 'vue'
const props = defineProps({
  title: String,
  // content: String,
  img: String
})

// const imgOpacity = ref(1)
const showImg = ref(false)
// console.log(props.img)
// console.log(props.img === undefined)
if (props.img !== '' && props.img !== undefined) {
  showImg.value = true
} else {
  showImg.value = false
}

// vanila js
onMounted(async () => {
  if ('IntersectionObserver' in window) {
    const lazyloadImages = document.querySelectorAll('.lazyloadimg')
    var imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const img = new Image()
          img.src = entry.target.firstElementChild.dataset.src
          img.onload = () => {
            var image = entry.target.firstElementChild
            image.style.opacity = 0
            setTimeout(() => {
              image.style.opacity = 1
              entry.target.classList.remove('lazyloadimg')
              image.classList.remove('lazy')
              imageObserver.unobserve(entry.target)
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
  <div class="my-2 mx-2 shadow-md hover:shadow-xl transition-all backdrop-blur-sm overflow-y-auto" style="background-color: rgba(255,255,255,0.3)">
    <div class="lazyloadimg flex content-center justify-center transition-all" id="img">
      <img :data-src="props.img" src="/loading.svg" class="lazy min-h-fit" alt="" v-if="showImg"/>
    </div>
    <div class="p-2">
      <!-- Title & Content -->
      <h1 class="font-bold text-xl">{{ props.title }}</h1>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.lazy {
  height: 10rem;
  margin: 5rem;
}
</style>
