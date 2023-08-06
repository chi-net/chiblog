<script setup lang="ts">
let mode = ref(0)

onMounted(() => {
  if (localStorage.getItem('theme-mode') !== undefined) {
    mode.value = (localStorage.getItem('theme-mode') === 'dark')
  }
  if (window.matchMedia (" (prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute('theme', 'dark-mode')
    mode.value = 1
  }
  watch(mode, () => {
    localStorage.setItem('theme-mode', mode? 'dark': 'light')
  })
})
function changeNightMode () {
  if (mode.value && process.client) {
    document.documentElement.setAttribute('theme', 'light-mode')
    mode.value = !mode.value
  } else {
    document.documentElement.setAttribute('theme', 'dark-mode')
    mode.value = !mode.value
  }
}

function btt () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div id="toolbar">
    <button @click="changeNightMode" :title="'切换至' + (mode ? '默认模式' : '暗黑模式')"><Icon name="nightmode"/></button><br/>
    <button @click="btt" title="返回顶部"><Icon name="backtotop"/></button><br/>
    <button @click="save" title="节流模式(实验版)"><Icon name="save"/></button>
  </div>
</template>

<style scoped lang="scss">
  #toolbar {
    cursor: pointer;
    z-index: 666;
    button {
      margin: 2px;
    }
    @media screen and (max-width: 1024px) {
      position: fixed;
      bottom: 1em;
      right: 1em;
    }
    @media screen and (min-width: 1024px) {
      position: fixed;
      bottom: 5em;
      right: calc(25% - 4em);
    }
  }
</style>