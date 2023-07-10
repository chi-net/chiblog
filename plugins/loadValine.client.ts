//@ts-ignore
import valine from 'valine'
//@ts-ignore
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$valine = valine
})
