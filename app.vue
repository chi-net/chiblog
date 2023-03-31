<script setup>
import setting from '@/mocks/settings'
import page from '@/mocks/pages'
// import { useStore } from '@/store'
import { onMounted, computed, ref, onUpdated } from 'vue'
import { useRouter } from 'vue-router'

import version from '@/version'
import confdata from '@/config'
import posts from './mocks/posts'

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

async function configureComments (res) {
  if (settings.value.site.comment.backend.enabled === true) {
    if (settings.value.site.comment.backend.type === 'workers') {
      try {
        const {data: resp} = await useFetch(settings.value.site.comment.backend.url)
        const commentdata = resp.value
        // console.log(commentdata)
        comments.value = Array.from(JSON.parse(commentdata))
        comments.value.forEach(data => {
          data.Content = String(data.Content).replace(/</g, '&lt;')
          data.Name = String(data.Name).replace(/</g, '&lt;')
          data.Site = String(data.Site).replace(/</g, '&lt;')
          data.Site = String(data.Site).replace(/javascript:/g, '')
        })
        // console.log(comments.value)
        res.data.comments = comments.value
        // console.log(commentdata)
        $store.value.all = res.data
        // $store.value.commit('updall', res.data)
      } catch (e) {
        // console.log(e)
        // no way no way qwq
      }
    }
  }
}

$router.afterEach(() => {
  // thanks to busuanzi!
  var bszCaller,bszTag;!function(){var c,d,e,a=!1,b=[];ready=function(c){return a||"interactive"===document.readyState||"complete"===document.readyState?c.call(document):b.push(function(){return c.call(this)}),this},d=function(){for(var a=0,c=b.length;c>a;a++)b[a].apply(document);b=[]},e=function(){a||(a=!0,d.call(window),document.removeEventListener?document.removeEventListener("DOMContentLoaded",e,!1):document.attachEvent&&(document.detachEvent("onreadystatechange",e),window==window.top&&(clearInterval(c),c=null)))},document.addEventListener?document.addEventListener("DOMContentLoaded",e,!1):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){/loaded|complete/.test(document.readyState)&&e()}),window==window.top&&(c=setInterval(function(){try{a||document.documentElement.doScroll("left")}catch(b){return}e()},5)))}(),bszCaller={fetch:function(a,b){var c="BusuanziCallback_"+Math.floor(1099511627776*Math.random());window[c]=this.evalCall(b),a=a.replace("=BusuanziCallback","="+c),scriptTag=document.createElement("SCRIPT"),scriptTag.type="text/javascript",scriptTag.defer=!0,scriptTag.src=a,scriptTag.referrerPolicy="no-referrer-when-downgrade",document.getElementsByTagName("HEAD")[0].appendChild(scriptTag)},evalCall:function(a){return function(b){ready(function(){try{a(b),scriptTag.parentElement.removeChild(scriptTag)}catch(c){bszTag.hides()}})}}},bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback",function(a){bszTag.texts(a),bszTag.shows()}),bszTag={bszs:["site_pv","page_pv","site_uv"],texts:function(a){this.bszs.map(function(b){var c=document.getElementById("busuanzi_value_"+b);c&&(c.innerHTML=a[b])})},hides:function(){this.bszs.map(function(a){var b=document.getElementById("busuanzi_container_"+a);b&&(b.style.display="none")})},shows:function(){this.bszs.map(function(a){var b=document.getElementById("busuanzi_container_"+a);b&&(b.style.display="inline")})}};
})

// onBeforeMount(async () => {
  // console.log('beforemounted')
  bTime.value = (new Date()).getTime()
  // console.log(bTime)
  $store.value.model = 'mocks'
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
    
    // console.log(settings.value.site.count.enabled)
    if (settings.value.site.count.enabled) {
      const element = document.createElement('script')
      element.src = "//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
      element.async = true
      document.head.appendChild(element)
    }
  }
})

onUpdated(() => {
  s.value = (new Date()).toLocaleString()
  // console.log('re-rendered at ' + (new Date()).toLocaleString())
})

useHead({
  title: '野獣先輩！！！'
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
    <div id="viewer">
      <h1>你是一个一个一个啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</h1>
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
</style>
