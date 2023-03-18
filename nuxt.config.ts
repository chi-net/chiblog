export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  app: {
    head: {
      title: 'chiblog',
      htmlAttrs: {
        lang: 'zh-cn',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, minium-scale=1, maxium-scale=1, user-scalable=no' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      // if you do not want to import busuanzi, please note it!
      // script: [{
      //   src: '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js',
      //   async: true
      // }]
    },    
  },
  modules: ['@pinia/nuxt']
})