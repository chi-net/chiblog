<script setup>
import { marked } from 'marked'
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