import {defineEventHandler, setHeader} from 'h3'
import posts from '@/mocks/posts'
import settings from '@/mocks/settings'
import { marked } from 'marked'

export default defineEventHandler(async (event) => {
  const renderer = {
    image(href, title, text) {
      return `
      <img src="${href}" title="${title}" alt="${text}"/>
      `
    }
  };
  marked.use({
    gfm: true,
    renderer
  })
  const config = useRuntimeConfig(event)
  let res = []
  if (config.chiblogConfigType === "production") {
    res = (await (await fetch(config.chiblogConfigUrl)).json()).data
  } else {
    res = {posts: posts, settings: settings}
  }
  event.node.res.setHeader("Content-Type", "application/xml;charset=utf8")
  // setHeader(event, "Content-Type", "text/xml")
  let resp =  `
   <feed xmlns="http://www.w3.org/2005/Atom">
     <title>${res.settings.site.title}</title>
     <subtitle>
       ${res.settings.site.desc}
     </subtitle>
     <updated>${new Date().toISOString()}</updated>
     <author>${res.settings.site.author.name}</author>
     <link rel="alternate" type="text/html"
      href="${res.settings.site.baseurl}"/>
     <link rel="self" type="application/atom+xml"
      href="${res.settings.site.baseurl + '/feed'}"/>
     <rights>Copyright (c) ${new Date().getFullYear()} ${res.settings.site.author.name}</rights>
     <generator uri="http://chiblog.chinet.work/" version="1.2">
       chiblog RSS Generator
     </generator>
  `
  res.posts.forEach(ele => {
    resp += `
      <entry>
       <title>${ele.title}</title>
       <id>${ele.name}</id>
       <link rel="alternate" type="text/html"
        href="${res.settings.site.baseurl + '/posts/' + ele.path}"/>
       <updated>${new Date(ele.updtime * 1000).toISOString()}</updated>
       <published>${new Date(ele.updtime * 1000).toISOString()}</published>
       <author>${ele.author}</author>
       <content type="html">
         ${(ele.banner)?`<img src="${ele.banner}"/>`:""}<div>${ele.desc}</div>
         <div>请移步<a href="${res.settings.site.baseurl + '/posts/' + ele.path}">文章页</a>查看文章详细内容</div>
       </content>
       <summary type="text">
       ${ele.desc}
       </summary>
     </entry>
    `
  })
  resp += '</feed>'
  return resp
})