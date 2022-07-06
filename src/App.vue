<template>
  <div id="indexapp" :style="{fontSize: fsize}">
    <div id="header">
      <h2 id="title"><router-link to="/">{{ title }}</router-link></h2>
      <div id="links"><h2 class="page-link"><a href="https://github.com/chihuo2104/chiblog-frontend/" target="_blank">chiblog</a></h2></div>
    </div>
    <!-- <h2><button id="open-toolbar" @click="this.isToolOpen = !(this.isToolOpen)"><h2><span v-if="!isToolOpen">打开工具箱</span><span v-if="isToolOpen">关闭工具箱</span></h2></button></h2> -->
    <!-- <Toolbar v-if="isToolOpen" id="toolbar"></Toolbar> -->
    <div id="viewer">
      <router-view/>
      <hr/>
      <div id="footer">本页面由<a href="https://im.chihuo2104.dev" target="_blank">chihuo2104</a>进行维护。版权所有&copy;2018-{{ new Date().getFullYear() }}。
      <br/>页面生成于{{ s }}，最后渲染于{{(new Date()).toLocaleString()}}。加载&nbsp;{{ loadTime }}ms&nbsp;渲染&nbsp;{{ renderTime }}ms</div>
    </div>
  </div>
</template>
<script>
// import Toolbar from '@/components/Toolbar.vue'
import settings from '@/mocks/settings'
import axios from 'axios'
export default {
  computed: {
    fsize () {
      return this.$store.state.fontsize + 'px'
    },
    loadTime () {
      return this.bTime - this.sTime
    },
    renderTime () {
      return this.eTime - this.bTime
    },
    title () {
      return this.settings.site.title
    }
  },
  data () {
    return {
      sTime: 0,
      eTime: 0,
      bTime: 0,
      isToolOpen: false,
      s: '',
      settings: {
        site: {
          title: 'none'
        }
      }
    }
  },
  mounted () {
    const d = new Date()
    this.eTime = (d.getTime())
    this.s = d.toLocaleString()
    this.settings = settings
    axios.get('https://api.ip.sb/geoip?t=' + new Date().getTime())
      .then((res) => {
        if (res.data.country_code === 'CN') {
          this.isCN = true
        } else {
          console.log('abroad')
          this.isCN = false
          this.$store.commit('fcn')
        }
      })
    console.log(this.settings.site.title)
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
    width: 100%;
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
  color: #00ccdd;
}
#footer {
  padding-bottom: 8px;
  padding-left: 1px;
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
#viewer {
  margin-top: 3em;
  display: block;
  @media screen and (max-width: 768px) {
    width: 100%;
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
</style>
