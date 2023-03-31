<script setup>
import { marked } from 'marked'
import { onMounted } from 'vue';
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
</style>