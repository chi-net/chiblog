//@ts-ignore
import {defineEventHandler} from 'h3'
import posts from '@/mocks/posts'
import settings from '@/mocks/settings'
import {GoogleGenerativeAI} from '@google/generative-ai'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig(event)
  let res = []
  if (config.chiblogConfigType === "production") {
    res = (await (await fetch(config.chiblogConfigUrl)).json()).data
  } else {
    //@ts-ignore
    res = {posts: posts, settings: settings}
  }
  if (query.pid === undefined) {
    setResponseStatus(event,400)
    return ''
  }
  if (res.settings.site.ai.enabled === undefined) {
    setResponseStatus(event,403)
    return ''
  }
  if (config.chiblogAiApiKey === '') {
    setResponseStatus(event,401)
    return ''
  }

  //@ts-ignore
  const resp = res.posts.find(element => element.id === parseInt(query.pid))
  if (resp === undefined) {
    setResponseStatus(event,404)
    return ''
  }

  setResponseHeader(event, "Content-Type", "application/json;charset=utf8")
  setResponseHeader(event, "Cache-Control", "public, max-age=86400")

  console.log(query.cid)

  const genAI = new GoogleGenerativeAI(config.chiblogAiApiKey)
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"})
  const prompt = `
  你需要给这篇文章生成一段简单的概述，只需要生成一段话，请不要输出其他任何与此无关的内容。
  要求如下：
  1.请使用简洁明了的语言进行概括
  2.请使用文章所使用的书写语言(如此文章由中文写成使用中文概括，以此类推)进行概括
  3.这一段话不超过250字(或英文单词)
  4.内容以Markdown形式呈现
  下面是这篇文章的标题和内容
  标题：${resp.title}
  内容：${resp.content}
  `

  // console.log(prompt)

  const result = await model.generateContent(prompt)
  try {
    const response = await result.response
    const text = response.text();

    return JSON.stringify({
      status: 200,
      result: text,
    })
  } catch (e) {
    console.log(e)
    return JSON.stringify({
      status: 400,
      result: 'failed',
    })
  }

})