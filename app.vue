<script setup>
import setting from '@/mocks/settings'
import page from '@/mocks/pages'
// import { useStore } from '@/store'
// import { onMounted, computed, ref, onUpdated } from 'vue'
// import { useRouter } from 'vue-router'

import version from '@/version'
import conf from '@/config'

import posts from './mocks/posts'

const runtimeConfig = useRuntimeConfig()

let confdata = conf
if (runtimeConfig.chiblogConfigType !== '' && runtimeConfig.chiblogConfigUrl !== '' && process.server) {
  confdata.model = runtimeConfig.chiblogConfigType
  confdata.settings = runtimeConfig.chiblogConfigUrl
  console.log(runtimeConfig.chiblogConfigType)
  console.log(confdata.model)
}

// console.log(runtimeConfig.chiblogConfigType)

const settings = ref({})
const pages = ref({})
const comments = ref({})

const totalTextCount = ref(0)
const textcount = ref('')

const $store = useAlldata()
const $router = useRouter()

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

const isMockMode = ref(false)

const showLinks = ref(false)

const loadTime = computed(() => bTime.value - sTime.value)
const renderTime = computed(() => eTime.value - bTime.value)
const show = computed(() => showLinks.value)

// async function configureComments (res) {
//   if (settings.value.site.comment.backend.enabled === true) {
//     if (settings.value.site.comment.backend.type === 'workers') {
//       try {
//         const {data: resp} = await useFetch(settings.value.site.comment.backend.url)
//         const commentdata = resp.value
//         // console.log(commentdata)
//         comments.value = Array.from(JSON.parse(commentdata))
//         comments.value.forEach(data => {
//           data.Content = String(data.Content).replace(/</g, '&lt;')
//           data.Name = String(data.Name).replace(/</g, '&lt;')
//           data.Site = String(data.Site).replace(/</g, '&lt;')
//           data.Site = String(data.Site).replace(/javascript:/g, '')
//         })
//         // console.log(comments.value)
//         res.data.comments = comments.value
//         // console.log(commentdata)
//         $store.value.all = res.data
//         // $store.value.commit('updall', res.data)
//       } catch (e) {
//         // console.log(e)
//         // no way no way qwq
//       }
//     }
//   }
// }

const hidden = ref(false)
// before each hide app index.

$router.beforeEach((to, from, next) => {
  // console.log('Beforeeach!')
  hidden.value = true
  // console.trace(hidden)
  // next()
  setTimeout(next, 1000)
})

$router.afterEach(() => {
  // console.log('aftereach!')
  hidden.value = false
  // console.trace(hidden)
  // thanks to busuanzi!
  var bszCaller,bszTag;!function(){var c,d,e,a=!1,b=[];ready=function(c){return a||"interactive"===document.readyState||"complete"===document.readyState?c.call(document):b.push(function(){return c.call(this)}),this},d=function(){for(var a=0,c=b.length;c>a;a++)b[a].apply(document);b=[]},e=function(){a||(a=!0,d.call(window),document.removeEventListener?document.removeEventListener("DOMContentLoaded",e,!1):document.attachEvent&&(document.detachEvent("onreadystatechange",e),window==window.top&&(clearInterval(c),c=null)))},document.addEventListener?document.addEventListener("DOMContentLoaded",e,!1):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){/loaded|complete/.test(document.readyState)&&e()}),window==window.top&&(c=setInterval(function(){try{a||document.documentElement.doScroll("left")}catch(b){return}e()},5)))}(),bszCaller={fetch:function(a,b){var c="BusuanziCallback_"+Math.floor(1099511627776*Math.random());window[c]=this.evalCall(b),a=a.replace("=BusuanziCallback","="+c),scriptTag=document.createElement("SCRIPT"),scriptTag.type="text/javascript",scriptTag.defer=!0,scriptTag.src=a,scriptTag.referrerPolicy="no-referrer-when-downgrade",document.getElementsByTagName("HEAD")[0].appendChild(scriptTag)},evalCall:function(a){return function(b){ready(function(){try{a(b),scriptTag.parentElement.removeChild(scriptTag)}catch(c){bszTag.hides()}})}}},bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback",function(a){bszTag.texts(a),bszTag.shows()}),bszTag={bszs:["site_pv","page_pv","site_uv"],texts:function(a){this.bszs.map(function(b){var c=document.getElementById("busuanzi_value_"+b);c&&(c.innerHTML=a[b])})},hides:function(){this.bszs.map(function(a){var b=document.getElementById("busuanzi_container_"+a);b&&(b.style.display="none")})},shows:function(){this.bszs.map(function(a){var b=document.getElementById("busuanzi_container_"+a);b&&(b.style.display="inline")})}};
})

// onBeforeMount(async () => {
  // console.log('beforemounted')
  bTime.value = (new Date()).getTime()
  // console.log(bTime)
  try {
    // const resp = await useFetch('/config.json?t=' + new Date().getTime())
    // confdata = await resp.json()
    // $store.value.commit('updmodel', confdata.model)
    // console.log($store.value.model.value)
    $store.value.model = confdata.model
  } catch (e) {
    console.error(e)
  }
  if ($store.value.model === 'production') {
    try {
      // eslint-disable-next-line prefer-const
      let res
      try {
        const { data: resp } = await useFetch(confdata.settings)
        res = resp.value        
      } catch (e) {
        throw new Error(e)
        // console.log(e)
      }
      // console.log(res)
      // $store.value.commit('updall', res.data)
      $store.value.all = res.data
      settings.value = res.data.settings
      pages.value = res.data.pages
      posts.value = res.data.posts
      dataFileVersionInfo.value = {
        createVersion: res.createVersion,
        createVersionDate: res.createVersionDate
      }
      if (res.data.createVersion === undefined && res.data.createVersionDate === undefined) {
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
        if (res.data.createVersionDate < version.versionReleaseDate) {
          versionDifference.value = 'old'
          if (res.data.createVersionDate < version.supportVersionDate) {
            versionSupported.value = true
          }
        } else if (res.data.createVersionDate > version.versionRelease) {
          versionDifference.value = 'new'
        }
      }
      // console.trace($store.value.all.posts)
      const arr = Array.from($store.value.all.posts)
      arr.forEach(ele => {
        totalTextCount.value += ele.content.length
      })
      // console.log(totalTextCount.value)
      textcount.value = renderNumber(totalTextCount.value)
    // if (process.browser) {
    //   if (settings.value.site.customjs.enabled) {
    //     // console.log('customjs!')
    //     const element = document.createElement('script')
    //     if (settings.value.site.customjs.type === 'script') {
    //       element.textContent = settings.value.site.customjs.script
    //       document.head.appendChild(element)
    //     } else {
    //       element.src = settings.value.site.customjs.script
    //       document.head.appendChild(element)
    //     }
    //     // expermental
    //     // if (settings.value.site.debug !== true) {
    //     //   console.log(settings.value.site.debug)
    //     //   window.console.log = () => {}
    //     // }
    //   }
    //   // console.log(settings.value.site.count.enabled)
    //   if (settings.value.site.count.enabled) {
    //     const element = document.createElement('script')
    //       element.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
    //       element.async = true
    //       document.head.appendChild(element)
    //     }
    //   }
      // isMockMode.value = false
      // await configureComments(res)
      // console.log(pages.value, settings.value)
    } catch (e) {
      console.error(e)
      // $store.value.model = 'mocks'
      // $store.value.commit('updmodel', 'mocks')
    }
  } else {
    settings.value = setting
    pages.value = page
    // THIS IS MOCKS HERE!!!!!
    // PRODUCTION IS ABOVE
    // initial your application here.
    // check version accessbility.
    // count texts
    posts.forEach(ele => {
      totalTextCount.value += ele.content.length
    })
    // console.log(totalTextCount.value)
    textcount.value = renderNumber(totalTextCount.value)
    // if (process.browser) {
      // if (settings.value.site.customjs.enabled) {
      //   // console.log('customjs!')
      //   const element = document.createElement('script')
      //   if (settings.value.site.customjs.type === 'script') {
      //     element.textContent = settings.value.site.customjs.script
      //     document.head.appendChild(element)
      //   } else {
      //     element.src = settings.value.site.customjs.script
      //     document.head.appendChild(element)
      //   }
        // expermental
        // if (settings.value.site.debug !== true) {
        //   console.log(settings.value.site.debug)
        //   window.console.log = () => {}
        // }
      // }
      // console.log(settings.value.site.count.enabled)
      // if (settings.value.site.count.enabled) {
      //   const element = document.createElement('script')
      //     element.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
      //     element.async = true
      //     document.head.appendChild(element)
      //   }
      // }

    // await configureComments({ data: { data: { settings: settings, comments: {} } } })
    // console.log(settings, pages)
  }
// })

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
    // $store.value.commit('fcn')
    $store.value.isCN = false
  }
  // console.log(settings.value)
  if (settings.value.site.customjs.enabled) {
    // console.log('customjs!')
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
    // console.log(settings.value.site.count.enabled)
    if (settings.value.site.count.enabled) {
      const element = document.createElement('script')
      element.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
      element.async = true
      document.head.appendChild(element)
    }
  hidden.value = false
})

onUpdated(() => {
  s.value = (new Date()).toLocaleString()
  // console.log('re-rendered at ' + (new Date()).toLocaleString())
})

useHead({
  title: '文章列表 - ' + settings.value.site.title
})

// if (process.client) document.title = '文章列表 - ' + settings.value.site.title

function renderNumber (num){
  if (num > 100000) {
    return Math.round((num / 10000) * 100) / 10 + 'w'
  } else if (num > 1000) {
    return Math.round((num / 10000) * 100) / 10 + 'k'
  } else {
    return num
  }
}

</script>
<template>
  <div id="indexapp">
    <Background :imgsrc="settings.site.background.img" blur="5px" v-if="settings.site.background.enabled" id="back"/>
    <Header :pages="pages" :settings="settings"/>
    <div id="viewer" :class="{hidden: (hidden)?true:false, normal: (hidden)?false:true}">
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
      <div v-if="$store.model === 'mocks' && settings.site.static === false">
        提示:您正在使用mock模式!<br/>
        如果您在正常情况下看到本页面，那就可能说明您的网络连接已经断开或无法获取数据文件。<br/>
        如果您的网络正常，请联系管理员。<br/>
        数据文件转存地址：/mock2get/mock2get 打开Devtools即可发现
      </div>
      <NuxtPage/>
    <Footer :settings="settings" :load-time="loadTime" :s="s" :render-time="renderTime" :version="version" :text-count="textcount"/>
    </div>
  </div>
</template>
<style lang="scss">
html {
  font-family: "PingFang SC", "MiSans", "HarmonyOS Sans SC", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
  width: 100%;
  word-break: break-all;
}
body {
  overflow-x: hidden;
}

// html[theme='dark-mode']
// @media (prefers-color-scheme: dark) {
html[theme='dark-mode'] {
  filter: invert(1) hue-rotate(180deg);
}
html[theme='dark-mode'] img{
  filter: invert(1) hue-rotate(180deg);
}
// }
@media (prefers-color-scheme: dark) {
  html {
  filter: invert(1) hue-rotate(180deg);
  }
  html img{
    filter: invert(1) hue-rotate(180deg);
  }
}
// html {
//   width: 100%;
// }
// html,body {
//   @media (min-width: 768px) {
//     margin: 0;
//     padding: 0;
//     border: 0;
//   }
//   word-break: break-all;
// }
h1,h2,h3,h4,h5,h6 {
  margin: 8px;
  padding: 0px;
  border: 0px;
}
// img {
//   @media (max-width: 768px) {
//     max-width: 100%;
//   }
//   @media (min-width: 768px) {
//     max-width: 60%;
//   }
// }
</style>
<style lang="scss" scoped>
#viewer {
  display: block;
  background-color: rgba(255,255,255,.2);
  backdrop-filter: blur(10px);
  transition: transform ease-in-out 1s;
  // transform: none;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 2px;
    margin-top: 3em;
  }
  @media only screen and (min-width: 768px) and (max-width: 1024px) {
	// 在这个宽度范围内执行某个操作
    margin-left: 10%;
    margin-right: 10%;
    margin-top: calc(16px + 3em);
  }
  @media screen and (min-width: 1024px) {
    margin-left: 25%;
    margin-right: 25%;
    margin-top: calc(16px + 3em);
  }
}
#back {
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
}
.hidden {
  transform: translateX(2000px) !important;
}
.normal {
  transform: translateX(0px) !important;
}
</style>
