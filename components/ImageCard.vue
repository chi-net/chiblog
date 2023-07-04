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
    const lazyloadImages = document.querySelectorAll('.lazy')
    var imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target
          image.src = image.dataset.src
          image.style.opacity = 0
          image.classList.remove('lazy')
          imageObserver.unobserve(image)
          setTimeout(() => (image.style.opacity = 1), 1000)
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
    <div id="img">
      <img :data-src="props.img" src="/shojo.gif" class="lazy" alt="" v-if="showImg" />
    </div>
    <div id="content">
      <!-- Title & Content -->
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../styles/cardback.scss';
$base: 18px;
.card {
  &:hover {
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.1), 0 -4px 3px rgba(0, 0, 0, 0.1);
  }
  div#content {
    h1 {
      font-size: $base * 1.5;
    }
    div {
      padding: 0;
      font-size: $base;
      img {
        max-width: 95%;
      }
    }
  }
  div#img img {
    transition: opacity ease-in-out 0.5s;
    width: 100%;
    // flex-shrink: 0;
    // width: 100%;
    // max-height: 100%;
    // max-height: 20%;
    overflow-y: hidden;
  }
  div#img {
    overflow-y: hidden;
    width: 100%;
    max-height: 100%;
    @media screen and (min-width: 768px) {
      // max-height: 400px;
    }
    @media only screen and (max-width: 768px) {
      // max-height: 100%;
    }
    padding: 0;
    // fle
  }
}
.imageshow {
  display: grid;
  grid-template-columns: 1fr;
}
</style>
