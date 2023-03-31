<script setup>
import { marked } from 'marked'
// import { onMounted } from 'vue';
const props = defineProps({
  content: String // content for the article
})

</script>
<template>
  <div id="content" v-html="marked.parse(props.content)">
  </div>    
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