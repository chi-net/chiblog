<script setup>
import setting from '@/mocks/settings'
import page from '@/mocks/pages'
// import { useStore } from '@/store'
import { onMounted, computed, ref, onUpdated } from 'vue'
import version from '~~/version'
import confdata from '@/config'

const settings = ref({})
const pages = ref({})
const comments = ref({})

const $store = useAlldata()

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
        comments.value = commentdata
        // console.log(comments.value)
        comments.value.forEach(data => {
          data.content = String(data.content).replace(/</g, '&lt;')
          data.name = String(data.name).replace(/</g, '&lt;')
          data.site = String(data.site).replace(/</g, '&lt;')
          data.site = String(data.site).replace(/javascript:/g, '')
        })
        // console.log(comments.value)
        res.data.comments = comments.value
        // console.log(commentdata)
        $store.value.all = res.data
        // $store.value.commit('updall', res.data)
      } catch (e) {
        // no way no way qwq
      }
    }
  }
}


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
        console.log(e)
      }
      // console.log(res)
      // $store.value.commit('updall', res.data)
      $store.value.all = res.data
      settings.value = res.data.settings
      pages.value = res.data.pages
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
      // isMockMode.value = false
      await configureComments(res)
      // console.log(pages.value, settings.value)
    } catch (e) {
      console.error(e)
      // $store.value.model = 'mocks'
      // $store.value.commit('updmodel', 'mocks')
    }
  } else {
    settings.value = setting
    pages.value = page
    // initial your application here.
    // check version accessbility.
    if (process.client) {
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
    }

    await configureComments({ data: { data: { settings: settings, comments: {} } } })
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
})

onUpdated(() => {
  s.value = (new Date()).toLocaleString()
  // console.log('re-rendered at ' + (new Date()).toLocaleString())
})


// $store.value.$subscribe(async () => {
//   // console.log('upd model')
//   if ($store.value.model === 'production') {
//     try {
//       // eslint-disable-next-line prefer-const
//       const resp = await fetch(confdata.settings)
//       const res = await resp.json()
//       // console.log(res)
//       // $store.value.commit('updall', res.data)
//       $store.value.all = res.data
//       settings.value = res.data.settings
//       pages.value = res.data.pages
//       dataFileVersionInfo.value = {
//         createVersion: res.createVersion,
//         createVersionDate: res.createVersionDate
//       }
//       if (res.data.createVersion === undefined && res.data.createVersionDate === undefined) {
//         isDifferentVersion.value = true
//         const ver = 20220924
//         dataFileVersionInfo.value = {
//           createVersion: '1.0.7',
//           createVersionDate: 20220924
//         }
//         // version 1.0.8(20221126) and later will write the version into json file.
//         if (ver < version.versionReleaseDate) {
//           versionDifference.value = 'old'
//         }
//       } else {
//         if (res.data.createVersionDate < version.versionReleaseDate) {
//           versionDifference.value = 'old'
//           if (res.data.createVersionDate < version.supportVersionDate) {
//             versionSupported.value = true
//           }
//         } else if (res.data.createVersionDate > version.versionRelease) {
//           versionDifference.value = 'new'
//         }
//       }
//       isMockMode.value = false
//       await configureComments(res)
//       // console.log(pages.value, settings.value)
//     } catch (e) {
//       // console.error(e)
//       $store.value.model = 'mocks'
//       // $store.value.commit('updmodel', 'mocks')
//     }
//   } else {
//     settings.value = setting
//     pages.value = page
//     // initial your application here.
//     // check version accessbility.
//     if (settings.value.site.customjs.enabled) {
//       console.log('customjs!')
//       const element = document.createElement('script')
//       if (settings.value.site.customjs.type === 'script') {
//         element.textContent = settings.value.site.customjs.script
//         document.head.appendChild(element)
//       } else {
//         element.src = settings.value.site.customjs.script
//         document.head.appendChild(element)
//       }
//       // expermental
//       // if (settings.value.site.debug !== true) {
//       //   console.log(settings.value.site.debug)
//       //   window.console.log = () => {}
//       // }
//     }
//     await configureComments({ data: { data: { settings: settings, comments: {} } } })
//     // console.log(settings, pages)
//   }
// })

function changePagesShowData () {
  showLinks.value = !(showLinks.value)
}
// console.log(confdata)

useHead({
  title: '文章列表 - ' + settings.value.site.title
})
if (process.client) document.title = '文章列表 - ' + settings.value.site.title
</script>
<template>
  <div id="indexapp">
    <Header :pages="pages" :settings="settings"/>
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
      <div v-if="$store.model === 'mocks'">
        提示:您正在使用mock模式!<br/>
        如果您在正常情况下看到本页面，那就可能说明您的网络连接已经断开或无法获取数据文件。<br/>
        如果您的网络正常，请联系管理员。<br/>
        数据文件转存地址：/mock2get/mock2get 打开Devtools即可发现
      </div>
      <NuxtPage/>
    <Footer :settings="settings" :load-time="loadTime" :s="s" :render-time="renderTime" :version="version"/>
    </div>
  </div>
</template>
<style lang="less">
html {
  font-family: "PingFang SC", "MiSans", "HarmonyOS Sans SC", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 18px;
}
// #open-toolbar {
//   position: fixed;
//   top: 8px;
//   right: 8px;
//   border-radius: 1px;
//   border-color: blue;
//   border-width: 2px;
//   cursor: pointer;
// }
// #open-toolbar h2 {
//   padding: 0px;
//   margin: 0px;
// }
// #toolbar {
//   position: fixed;
//   z-index: 10;
//   top: 20%;
//   left: 0;
//   right: 0;
// }
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
</style>
