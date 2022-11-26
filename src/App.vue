<script setup>
import axios from 'axios'
import setting from '@/mocks/settings'
import page from '@/mocks/pages'
import { useStore } from 'vuex'
import { onBeforeMount, onMounted, computed, watch, ref, onUpdated } from 'vue'
import version from '@/version'

const settings = ref({})
const pages = ref({})
const comments = ref({})

const $store = useStore()

const eTime = ref(0)
// watch(eTime, () => { console.log('upd') })

const bTime = ref(0)
// let isShow = true
// console.log('setup')
const sTime = ref((new Date().getTime()))
// console.log(sTime)
const s = ref('')
// check ip address
axios.get('https://api.ip.sb/geoip?t=' + new Date().getTime())
  .then((res) => {
    if (res.data.country_code === 'CN') {
    } else {
      $store.commit('fcn')
    }
  })
let confdata
const showLinks = ref(false)

const loadTime = computed(() => bTime.value - sTime.value)
const renderTime = computed(() => eTime.value - bTime.value)
const show = computed(() => showLinks.value)

onBeforeMount(async () => {
  // console.log('beforemounted')
  bTime.value = (new Date()).getTime()
  // console.log(bTime)
  try {
    confdata = (await axios.get('config.json?t=' + new Date())).data
    $store.commit('updmodel', confdata.model)
  } catch (e) {
    console.error(e)
  }
})

onMounted(() => {
  // console.log('mounted')
  const d = new Date()
  eTime.value = (d.getTime())
  // console.log(eTime)
  // renderTime = eTime - bTime
  s.value = d.toLocaleString()
  // console.log(s)
})

onUpdated(() => {
  s.value = (new Date()).toLocaleString()
  // console.log('re-rendered at ' + (new Date()).toLocaleString())
})

function getConfData (url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

async function getCommentData (commenturl) {
  return new Promise((resolve, reject) => {
    axios.get(commenturl)
      .then(data => resolve(data))
      .then(err => reject(err))
  })
}

async function configureComments (res) {
  if (settings.value.site.comment.backend.enabled === true) {
    if (settings.value.site.comment.backend.type === 'workers') {
      const commentdata = (await getCommentData(settings.value.site.comment.backend.url)).data
      // console.log(commentdata)
      comments.value = commentdata
      // console.log(comments.value)
      comments.value.forEach(data => {
        data.content = String(data.content).replace(/</g, '&lt;')
        data.name = String(data.name).replace(/</g, '&lt;')
        data.site = String(data.site).replace(/</g, '&lt;')
        data.site = String(data.site).replace(/javascript:/g, '')
      })
      // console.log(comments.value)
      res.data.data.comments = comments.value
      // console.log(commentdata)
      $store.commit('updall', res.data.data)
    }
  }
}

watch(() => $store.state.model, async () => {
  // console.log('upd model')
  if ($store.state.model === 'production') {
    try {
      // eslint-disable-next-line prefer-const
      const res = await getConfData(confdata.settings)
      // console.log(res)
      $store.commit('updall', res.data.data)
      settings.value = res.data.data.settings
      pages.value = res.data.data.pages
      await configureComments(res)
      // console.log(pages.value, settings.value)
    } catch (e) {
      // console.error(e)
      $store.commit('updmodel', 'mocks')
    }
  } else {
    settings.value = setting
    pages.value = page
    // initial your application here.
    if (settings.value.site.customjs.enabled) {
      console.log('customjs!')
      const element = document.createElement('script')
      if (settings.value.site.customjs.type === 'script') {
        element.textContent = settings.value.site.customjs.script
        document.head.appendChild(element)
      } else {
        element.src = settings.value.site.customjs.script
        document.head.appendChild(element)
      }
    }
    await configureComments({ data: { data: { settings: settings, comments: {} } } })
    // console.log(settings, pages)
  }
})

function changePagesShowData () {
  showLinks.value = !(showLinks.value)
}
// console.log(confdata)

</script>
<template>
  <div id="indexapp">
    <div id="header">
      <div id="set-mob">
        <h2 id="title"><router-link to="/">{{ settings.site.title }}</router-link></h2>
        <div id="pages-mob-an" @click="changePagesShowData">
          <h2>链接</h2>
      </div>

      </div>
      <div id="pages-pc">
        <span v-for="i in pages" :key="i.id">
          <div v-if="i.type === 'link'">
            <h2 class="page-link"><a :href="i.url" :target="i.target">{{ i.title }}</a></h2>
          </div>
          <div v-if="i.type === 'article'">
            <h2 class="page-link"><router-link :to="'/' + i.name">{{ i.title }}</router-link></h2>
          </div>
        </span>
      </div>
      <div id="pages-mob" :style="{ display: (show)?'block':'none' }">
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
      <div id="cpr" v-show="settings.site.showcopyright">本页面由<a :href="settings.site.author.url" target="_blank">{{settings.site.author.name}}</a>进行维护。版权所有&copy;{{settings.site.copyright.startyear}}-{{ new Date().getFullYear() }}。</div>
      <div id="footer" v-show="settings.site.showstats">页面生成于{{ s }}，最后渲染于{{(new Date()).toLocaleString()}}。加载&nbsp;{{ loadTime }}ms&nbsp;渲染&nbsp;{{ renderTime }}ms</div>
      <div>
        Powered by
        <a href="https://chiblog.apps.chihuo2104.dev/" target="_blank">chiblog</a>
        @{{version.version}}({{version.versionReleaseDate}}) based on <a href="https://vuejs.org" target="_blank">Vue</a>.
      </div>
      <div v-html="settings.site.footer"></div>
    </div>
  </div>
</template>
<style lang="less">
#app {
  font-family: "PingFang SC", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  word-break: break-all;
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
  @media  screen and (min-width: 768px) {
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);
  z-index: 10;
}
#pages-pc {
  @media screen and (max-width: 768px) {
    display: none;
  }
  @media screen and (min-width: 768px) {
    display: flex;
  }
}
#pages-mob-an {
  @media screen and (min-width: 768px) {
    display: none;
  }
  cursor: pointer;
}
#pages-mob {
  @media screen and (min-width: 768px) {
    display: none;
  }
}
#set-mob {
  display: flex;
  justify-content: space-between;
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
