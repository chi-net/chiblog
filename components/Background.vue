<script setup>
const props = defineProps({
  imgsrc: String,
  blur: String
})
</script>
<template>
  <img :src="props.imgsrc" :style="{ filter: props.blur }" />
  <div id="dark"></div>
</template>
<style lang="scss" scoped>
img {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  z-index: -1000;
  filter: blur(5px);
}
#dark {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  z-index: -500;
  // filter: blur(5px);
}
@media (prefers-color-scheme: dark) {
  img {
    display: none !important;
  }
  #dark {
    display: block;
    background-color: #aaa;
  }
}
</style>
