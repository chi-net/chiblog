<script setup>
const props = defineProps({
  settings: Object,
  loadTime: Number,
  renderTime: Number,
  version: Object,
  s: String,
  textCount: String
})
import { nextTick, ref } from 'vue'
const tickTime = ref(new Date())
nextTick(() => {
  tickTime.value = new Date()
})
const settings = ref(props.settings)
</script>
<template>
  <div id="footer-component">
    <hr />
    <div id="footer">
      <div id="cpr" v-show="settings.site.showcopyright">
        本页面由<a :href="settings.site.author.url" target="_blank">{{
          settings.site.author.name
        }}</a
        >进行维护。版权所有&copy;{{ settings.site.copyright.startyear }}-{{
          new Date().getFullYear()
        }}。
      </div>
      <div>
        <span v-show="settings.site.showstats"
          >页面生成于{{ tickTime.toLocaleString() }}，最后渲染于{{ s }}。加载&nbsp;{{
            loadTime
          }}ms&nbsp;渲染&nbsp;{{ renderTime }}ms</span
        >
        <span v-show="settings.site.textcount.global">&nbsp;站点总字数：{{ textCount }}</span>
        <br />
        <span v-show="settings.site.count.enabled && settings.site.count.site"
          >本站总访问次数：<span id="busuanzi_value_site_pv">加载中...</span
          >&nbsp;|&nbsp;本站访客数：<span id="busuanzi_value_site_uv">加载中...</span></span
        >
      </div>
      <div>
        Powered by
        <a href="https://chiblog.chinet.work/" target="_blank">chiblog</a>@{{ version.version }}({{
          version.versionReleaseDate
        }}) based on <a href="https://vuejs.org" target="_blank">Vue</a>.
      </div>
      <div v-html="settings.site.footer"></div>
    </div>
  </div>
</template>
<style scoped>
#footer a:visited,
a,
a:link,
a:hover,
a:active {
  text-decoration: none;
}
#footer a,
a:visited {
  color: black;
}
#footer a:hover,
a:active {
  color: cyan;
}
#footer {
  padding-bottom: 8px;
  padding-left: 1px;
  padding-right: 1px;
  font-size: 0.9em;
}
</style>
