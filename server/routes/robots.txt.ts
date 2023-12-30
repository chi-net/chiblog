//@ts-ignore
import {defineEventHandler} from 'h3'
import posts from '@/mocks/posts'
import settings from '@/mocks/settings'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  let res = []
  if (config.chiblogConfigType === "production") {
    res = (await (await fetch(config.chiblogConfigUrl)).json()).data
  } else {
    res = {posts: posts, settings: settings}
  }
  event.node.res.setHeader("Content-Type", "text/plain;charset=utf8")
  if (res.settings.site.seo.robots.enabled) {
    return res.settings.site.seo.robots.enabled.content
  } else {
    return sendRedirect(event, '/404.html')
  }
})