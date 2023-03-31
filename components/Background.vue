<script setup>
const props = defineProps({
  imgsrc: String,
  blur: String
})
</script>
<template>
  <img :src="props.imgsrc" :style="{filter: props.blur}"/>
</template>
<style lang="scss" scoped>
img {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  z-index: -1000;
  filter: blur(5px);
}
</style>