<script setup lang="ts">
// just for article
// import { defineProps, ref, onMounted } from 'vue'
const props = defineProps({
  title: String,
  // content: String,
  img: String
})

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

})

</script>
<template>
  <div class="card">
    <img :src="props.img" alt="" v-if="showImg"/>
    <div><!-- Title & Content -->
      <h1>{{ props.title }}</h1>
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
  display: grid;
  &:hover {
    box-shadow: 0 4px 3px rgba(0,0,0,.1),0 -4px 3px rgba(0,0,0,.1);
  }
  div {
    padding-top: 4px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 8px;
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
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  img {
    float: right;
    @media only screen and (max-width: 1024px) and (min-width: 768px){
      height: 100%;
    }
    // flex-grow: 1;
    // flex-shrink: 0;
    width: 100%;
    // max-height: 100%;
    // max-height: 20%;
    overflow-y: hidden;
  }
}
</style>