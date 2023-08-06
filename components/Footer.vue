<script setup>
const props = defineProps({
  settings: Object,
  loadTime: Number,
  renderTime: Number,
  version: Object,
  textCount: String
})
// import { version as ver2 } from 'nuxt'
const settings = reactive(props.settings)
</script>
<template>
  <footer id="footer-component">
    <div id="footer">
      <div id="sys">
        <span id="cpr" v-show="settings.site.showcopyright">
         &copy;{{ settings.site.copyright.startyear }}-{{
            new Date().getFullYear()
          }} <a :href="settings.site.author.url" target="_blank">{{
            settings.site.author.name
          }}</a>
        </span>
          <span v-show="settings.site.showstats">加载{{loadTime }}ms 渲染{{ renderTime }}ms</span>
          <span v-show="settings.site.textcount.global">站点总字数：{{ textCount }}</span>
          <span v-show="settings.site.count.enabled && settings.site.count.site">
            本站总访问次数：<span id="busuanzi_value_site_pv">加载中...</span>
            本站访客数：<span id="busuanzi_value_site_uv">加载中...</span>
          </span>
          <span>
          Powered by
          <a href="https://chiblog.chinet.work/" target="_blank">chiblog</a>@<small v-if="version.type !== 'dev'">{{ version.version }}({{ version.versionReleaseDate }})</small>
            <small v-else> {{ version.version }}(canary) </small>
          </span>
      </div>
      <span v-if="version.type === 'dev'" style="color: rgb(245, 150, 170);">
        站点管理员请注意：您正在使用开发版本(分支dev/镜像标签dev)，作为开发版本，仅供测试尝鲜使用，此版本可能并不稳定，内部的许多功能可能会更改，因此不推荐您于生产环境中使用，建议您使用稳定版本(GitHub
        Release中版本或镜像标签latest/x.x.x)。和Beta版本不同，本提示无法消除。
      </span>
      <span v-if="version.type === 'beta'" style="color: rgb(245, 150, 170);">
        站点管理员请注意：您正在使用开发版本(分支beta/镜像标签x.x.xb)，作为开发版本，仅供测试尝鲜使用，此版本可能并不稳定，内部的许多功能可能会更改，因此不推荐您于生产环境中使用，建议您使用稳定版本(GitHub
        Release中版本或镜像标签latest/x.x.x)。请在运行时将环境变量"NUXT_CHIBLOG_IGNORE_BETA_TIP"设置为"true"即可消除本提示。
      </span>
      <div v-html="settings.site.footer" id="cus"></div>
    </div>
  </footer>
</template>
<style scoped>
a:visited,
a,
a:link,
a:hover,
a:active {
  text-decoration: none;
  transition: color 200ms ease-in-out;
}
a,
a:visited {
  color: #bbbbbb;
}
a:hover,
a:active {
  color: cyan;
}
div#sys span {
  padding: 2px;
}
#footer {
  color: #bbbbbb;
  padding-bottom: 8px;
  padding-left: 1px;
  padding-right: 1px;
  backdrop-filter: blur(20px);
  @media screen and (min-width: 1024px) {
    margin-left: 25%;
    margin-right: 25%;
  }
}

div#sys {
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss">
div#cus {
  a:visited,
  a,
  a:link,
  a:hover,
  a:active {
    text-decoration: none;
    transition: color 200ms ease-in-out;
  }
  a,
  a:visited {
    color: #bbbbbb;
  }
  a:hover,
  a:active {
    color: cyan;
  }
}
</style>