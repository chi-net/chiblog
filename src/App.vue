<script setup>
import setting from '@/mocks/settings'
import page from '@/mocks/pages'
import { useStore } from '@/store'
import { onBeforeMount, onMounted, computed, ref, onUpdated } from 'vue'
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

const isDifferentVersion = ref(false)
const versionDifference = ref('')
const dataFileVersionInfo = ref({})
const versionSupported = ref(false)

const isMockMode = ref(true)

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
    const resp = await fetch('config.json?t=' + new Date().getTime())
    confdata = await resp.json()
    // $store.commit('updmodel', confdata.model)
    $store.model = confdata.model
  } catch (e) {
    console.error(e)
  }
})

onMounted(async () => {
  // console.log('mounted')
  const d = new Date()
  eTime.value = (d.getTime())
  // console.log(eTime)
  // renderTime = eTime - bTime
  s.value = d.toLocaleString()
  // console.log(s)
  // check ip address
  const resp = await fetch('https://api.ip.sb/geoip?t=' + new Date().getTime())
  const res = await resp.json()
  if (res.country_code === 'CN') {
  } else {
    // $store.commit('fcn')
    $store.isCN = false
  }
})

onUpdated(() => {
  s.value = (new Date()).toLocaleString()
  // console.log('re-rendered at ' + (new Date()).toLocaleString())
})

async function configureComments (res) {
  if (settings.value.site.comment.backend.enabled === true) {
    if (settings.value.site.comment.backend.type === 'workers') {
      try {
        const resp = await fetch(settings.value.site.comment.backend.url)
        const commentdata = await resp.json()
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
        $store.all = res.data.data
        // $store.commit('updall', res.data.data)
      } catch (e) {
        // no way no way qwq
      }
    }
  }
}

$store.$subscribe(async () => {
  // console.log('upd model')
  if ($store.model === 'production') {
    try {
      // eslint-disable-next-line prefer-const
      const resp = await fetch(confdata.settings)
      const res = await resp.json()
      // console.log(res)
      // $store.commit('updall', res.data.data)
      $store.all = res.data.data
      settings.value = res.data.data.settings
      pages.value = res.data.data.pages
      dataFileVersionInfo.value = {
        createVersion: res.data.createVersion,
        createVersionDate: res.data.createVersionDate
      }
      if (res.data.data.createVersion === undefined && res.data.data.createVersionDate === undefined) {
        isDifferentVersion.value = true
        const ver = 20220924
        dataFileVersionInfo.value = {
          createVersion: '1.0.7',
          createVersionDate: 20220924
        }
        // version 1.0.8(20221126) and later will write the version into json file.
        if (ver < version.versionReleaseDate) {
          versionDifference.value = 'old'
        }
      } else {
        if (res.data.data.createVersionDate < version.versionReleaseDate) {
          versionDifference.value = 'old'
          if (res.data.data.createVersionDate < version.supportVersionDate) {
            versionSupported.value = true
          }
        } else if (res.data.data.createVersionDate > version.versionRelease) {
          versionDifference.value = 'new'
        }
      }
      isMockMode.value = false
      await configureComments(res)
      // console.log(pages.value, settings.value)
    } catch (e) {
      // console.error(e)
      $store.model = 'mocks'
      // $store.commit('updmodel', 'mocks')
    }
  } else {
    settings.value = setting
    pages.value = page
    // initial your application here.
    // check version accessbility.
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
      // expermental
      // if (settings.value.site.debug !== true) {
      //   console.log(settings.value.site.debug)
      //   window.console.log = () => {}
      // }
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
    {{ $store }}
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
    <div id="viewer">
      <div id="datatip" v-if="versionDifference !== ''">
        数据文件过时提醒：<br/>
        尽管本版本最低支持{{version.supportVersion}}({{version.supportVersionDate}}),
        但是您的数据文件所用的版本为
        {{(dataFileVersionInfo.createVersionDate === 20220924)?'v1.0.7(20220924)':dataFileVersionInfo.createVersion}}
        ({{(dataFileVersionInfo.createVersionDate === 20220924)?'或更早':dataFileVersionInfo.createVersionDate}}),过于{{(versionDifference === 'old')?'老旧':'新'}}
        {{(versionSupported === false)?'且并不受目前版本支持':''}}，可能会产生数据无法正常读取或无法使用新版本功能的错误。<br/>
        如果你是这个博客的管理员，请更新你的数据文件。<br/>
        如果您是访客，请联系管理员。<br/>
        数据正常即可关闭此提示。
      </div>
      <div v-if="isMockMode === true">
        提示:您正在使用mock模式!<br/>
        如果您在正常情况下看到本页面，那就可能说明您的网络连接已经断开或无法获取数据文件。<br/>
        如果您的网络正常，请联系管理员。<br/>
        数据文件转存地址：#/mock2get/ 打开Devtools即可发现
      </div>
      <router-view/>
      <hr/>
      <div id="footer">
        <div id="cpr" v-show="settings.site.showcopyright">本页面由<a :href="settings.site.author.url" target="_blank">{{settings.site.author.name}}</a>进行维护。版权所有&copy;{{settings.site.copyright.startyear}}-{{ new Date().getFullYear() }}。</div>
        <div v-show="settings.site.showstats">页面生成于{{ s }}，最后渲染于{{(new Date()).toLocaleString()}}。加载&nbsp;{{ loadTime }}ms&nbsp;渲染&nbsp;{{ renderTime }}ms</div>
        <div>
          Powered by
          <a href="https://chiblog.apps.chihuo2104.dev/" target="_blank">chiblog</a>@{{version.version}}({{version.versionReleaseDate}}) based on <a href="https://vuejs.org" target="_blank">Vue</a>.
        </div>
        <div v-html="settings.site.footer"></div>
      </div>
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
