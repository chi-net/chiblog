<script setup lang='ts'>

</script>

<template>
  <div id="helper">
    <div>Helper Page</div>
  </div>
</template>

<style scoped lang='scss'>
#helper {
  cursor: pointer;
  z-index: 666;
  button {
    margin: 2px;
  }
  @media screen and (max-width: 1024px) {
    display: none;
  }
  @media screen and (min-width: 1024px) {
    position: absolute;
    top: 5em;
    right: 3em;
    max-height: 50%;
    overflow-y: scroll;
  }
}
</style>