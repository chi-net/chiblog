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
  <div class="card" :class="{ imageshow: showImg }">
    <div class="lazyloadimg" id="img">
      <img :data-src="props.img" src="/loading.svg" class="lazy" alt="" v-if="showImg" />
    </div>
    <div>
      <!-- Title & Content -->
      <h1>{{ props.title }}</h1>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../styles/cardback.scss';
//$base: 18px;
.card {
  transition: all ease-in-out 200ms;
  &:hover {
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.1), 0 -4px 3px rgba(0, 0, 0, 0.1);
  }
  div {
    padding-top: 4px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 8px;
    h1 {
      font-size: 1.5ex;
    }
    div {
      padding: 0;
      //font-size: $base;
      img {
        max-width: 95%;
      }
    }
  }
  div#img {
    display: flex;
    justify-content: center;
    padding: 0;
  }
  img {
    transition: opacity ease-in-out 200ms;
    //float: right;
    width: 100%;
    overflow-y: hidden;
  }
}
.imageshow {
  display: grid;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.lazy {
  transform: scale(0.2);
}
</style>
