<script setup>
const props = defineProps({
  settings: Object,
  loadTime: Number,
  renderTime: Number,
  version: Object,
  s: String
})
const settings = props.settings
</script>
<template>
  <div id="footer-component">
    <hr/>
    <div id="footer">
      <div id="cpr" v-show="settings.site.showcopyright">本页面由<a :href="settings.site.author.url" target="_blank">{{settings.site.author.name}}</a>进行维护。版权所有&copy;{{settings.site.copyright.startyear}}-{{ new Date().getFullYear() }}。</div>
      <div v-show="settings.site.showstats">页面生成于{{ s }}，最后渲染于{{(new Date()).toLocaleString()}}。加载&nbsp;{{ loadTime }}ms&nbsp;渲染&nbsp;{{ renderTime }}ms</div>
      <div>
        Powered by
        <a href="https://chiblog.chinet.work/" target="_blank">chiblog</a>@{{version.version}}({{version.versionReleaseDate}}) based on <a href="https://vuejs.org" target="_blank">Vue</a>.
      </div>
      <div v-html="settings.site.footer"></div>
    </div>
  </div>
</template>