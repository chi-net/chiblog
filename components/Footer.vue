<script setup>
const props = defineProps({
  settings: Object,
  loadTime: Number,
  renderTime: Number,
  version: Object,
  s: String,
  textCount: String
})
import { ref } from 'vue'
// import { version as ver2 } from 'nuxt'
const settings = ref(props.settings)
</script>
<template>
  <footer id="footer-component">
    <div id="footer">
      <span id="cpr" v-show="settings.site.showcopyright">
       &copy;{{ settings.site.copyright.startyear }}-{{
          new Date().getFullYear()
        }} <a :href="settings.site.author.url" target="_blank">{{
          settings.site.author.name
        }}</a>
      </span>
      <span v-show="settings.site.showstats">加载&nbsp;{{loadTime }}ms&nbsp;|&nbsp;渲染&nbsp;{{ renderTime }}ms</span>
      <span v-show="settings.site.textcount.global">&nbsp;站点总字数：{{ textCount }}</span>
      <span v-show="settings.site.count.enabled && settings.site.count.site">
        本站总访问次数：<span id="busuanzi_value_site_pv">加载中...</span>&nbsp;|&nbsp;本站访客数：<span id="busuanzi_value_site_uv">加载中...</span>
      </span>
      <span v-if="version.type === 'dev'" style="color: red">
        站点管理员请注意：您正在使用开发版本(分支dev/镜像标签dev)，作为开发版本，仅供测试尝鲜使用，此版本可能并不稳定，内部的许多功能可能会更改，因此不推荐您于生产环境中使用，建议您使用稳定版本(GitHub
        Release中版本或镜像标签latest/x.x.x)。和Beta版本不同，本提示无法消除。
      </span>
      <span>
        Powered by
        <a href="https://chiblog.chinet.work/" target="_blank">chiblog</a>@<span
          v-if="version.type !== 'dev'"
        >
          {{ version.version }}({{ version.versionReleaseDate }})
        </span>
        <span v-else> {{ version.version }}(canary) </span>
        </span>
        <div v-html="settings.site.footer"></div>
    </div>
  </footer>
</template>
<style scoped>
#footer a:visited,
a,
a:link,
a:hover,
a:active {
  text-decoration: none;
  transition: color 200ms ease-in-out;
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
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 8px;
  padding-left: 1px;
  padding-right: 1px;
  font-size: 0.9em;
  backdrop-filter: blur(20px);
  @media screen and (min-width: 1024px) {
    margin-left: 20%;
    margin-right: 20%;
  }
}
</style>
