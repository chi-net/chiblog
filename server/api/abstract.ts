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
  const prompt = "请给这篇文章生成一段简单的概述，只需要生成一段话，不需要输出其他无关的任何内容。\n" + resp.content

  console.log(prompt)

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