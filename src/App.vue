<script setup>
import settings from '@/mocks/settings'
import pages from '@/mocks/pages'
import axios from 'axios'
import { useStore } from 'vuex'

const $store = useStore()

axios.get('https://api.ip.sb/geoip?t=' + new Date().getTime())
  .then((res) => {
    if (res.data.country_code === 'CN') {
    } else {
      $store.commit('fcn')
    }
  })
</script>
<template>
  <div id="indexapp">
    <div id="header">
      <h2 id="title"><router-link to="/">{{ settings.site.title }}</router-link></h2>
      <div id="pages">
        <span v-for="i in pages" :key="i.id">
          <div v-if="i.type === 'link'">
            <h2 class="page-link"><a :href="i.url" :target="i.target">{{ i.title }}</a></h2>
          </div>
          <div v-if="i.type === 'article'">
            <h2 class="page-link"><router-link :to="'/' + i.name">{{ i.title }}</router-link></h2>
          </div>
        </span>
      </div>
    </div>
    <!-- <h2><button id="open-toolbar" @click="this.isToolOpen = !(this.isToolOpen)"><h2><span v-if="!isToolOpen">打开工具箱</span><span v-if="isToolOpen">关闭工具箱</span></h2></button></h2> -->
    <!-- <Toolbar v-if="isToolOpen" id="toolbar"></Toolbar> -->
    <div id="viewer">
      <router-view/>
      <hr/>
      <div id="footer">本页面由<a :href="settings.site.author.url" target="_blank">{{settings.site.author.name}}</a>进行维护。版权所有&copy;{{settings.site.copyright.startyear}}-{{ new Date().getFullYear() }}。
      <br/>页面生成于{{ s }}，最后渲染于{{(new Date()).toLocaleString()}}。加载&nbsp;{{ loadTime }}ms&nbsp;渲染&nbsp;{{ renderTime }}ms
      <br/>Powered by <a href="https://github.com/chihuo2104/chiblog-frontend" target="_blank">chiblog</a> based on <a href="https://vuejs.org" target="_blank">Vue</a>.
      </div>
      <div v-html="settings.site.footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    loadTime () {
      return this.bTime - this.sTime
    },
    renderTime () {
      return this.eTime - this.bTime
    }
  },
  data () {
    return {
      sTime: 0,
      eTime: 0,
      bTime: 0,
      s: ''
    }
  },
  mounted () {
    const d = new Date()
    this.eTime = (d.getTime())
    this.s = d.toLocaleString()
    // console.log(this.settings.site.title)
  },
  created () {
    this.sTime = (new Date().getTime())
  },
  beforeMount () {
    this.bTime = (new Date().getTime())
  },
  components: {
    // Toolbar
  }
}
</script>
<style lang="less">
#app {
  font-family: "PingFang SC", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  font-size: 18px;
}
#open-toolbar {
  position: fixed;
  top: 8px;
  right: 8px;
  border-radius: 1px;
  border-color: blue;
  border-width: 2px;
  cursor: pointer;
}
#open-toolbar h2 {
  padding: 0px;
  margin: 0px;
}
#toolbar {
  position: fixed;
  z-index: 10;
  top: 20%;
  left: 0;
  right: 0;
}
html,body {
  @media (min-width: 768px) {
    margin: 0;
    padding: 0;
    border: 0;
  }
  width: 100%;
}
h1,h2,h3,h4,h5,h6 {
  margin: 8px;
  padding: 0px;
  border: 0px;
}
img {
  @media (max-width: 768px) {
    max-width: 100%;
  }
  @media (min-width: 768px) {
    max-width: 60%;
  }
}
</style>
<style lang="less" scoped>
#footer a:visited,a,a:link,a:hover,a:active {
  text-decoration: none;
}
#footer a,a:visited {
  color: black;
}
#footer a:hover,a:active {
  color: cyan;
}
#footer {
  padding-bottom: 8px;
  padding-left: 1px;
  padding-right: 1px;
  font-size: 0.9em;
}
#header {
  display: flex;
  position: fixed;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px)
}
#pages {
  display: flex;
}
#viewer {
  margin-top: 3em;
  display: block;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 2px;
  }
  @media screen and (min-width: 768px) {
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 16px;
  }
}
.page-link a,.page-link a:visited {
  color: black;
}
.page-link a:hover {
  color: cyan;
}
#title a,#title a:visited {
  color: black;
}
#title a:hover {
  color: cyan;
}
.likeh2 {
  margin: 8px;
  font-size: 2em;
}
</style>
