<template>
  <div v-if="china">
    <h1>{{post.title}}</h1>
    <h2>{{post.author}}于{{reltime}}发布</h2>
    <div v-html="rcontent" id="content"></div>
    <div id="comments">
      <Comments :pid="post.id"></Comments>
    </div>
  </div>
  <div v-else>
    <h1>由于您目前位于中国大陆地区，为符合中国大陆的法律法规，本文章已经被隐藏，暂时无法显示。<br/><small>如果您已经确定您正在使用非中国大陆IP访问，请刷新页面并等待5-10秒......</small></h1>
  </div>
</template>
<script>
import Comments from '@/components/Comments'
import { marked } from 'marked'
import posts from '@/mocks/posts'
import settings from '@/mocks/settings'
export default {
  data () {
    return {
      post: {
        id: -1,
        title: 'none',
        path: 'none',
        name: 'none',
        content: 'none',
        time: 'none',
        china: false,
        author: 'none'
      },
      china: false
    }
  },
  methods: {
    checkCN () {
      if (this.$store.state.isCN === true) {
        if (this.post.china === true) { // if in China? and post support china
          console.log('in china')
          this.china = true
        } else {
          this.china = false
        }
      } else { // abroad
        console.log('abroad')
        document.title = this.post.title + ' - ' + settings.site.title
        this.china = true
      }
    }
  },
  computed: {
    rcontent () {
      return marked.parse(this.post.content)
    },
    reltime () {
      return (new Date(this.post.time * 1000).toLocaleString())
    },
    isCN () {
      return this.$store.state.isCN
    }
  },
  beforeDestory () {
  },
  mounted () {
    console.log(posts.find(post => post.path === this.path))
    if (posts.find(post => post.path === this.path) === undefined) {
      // console.log(this.$route.path)
      this.$router.push({ path: '/404.html' })
    } else {
      const a = posts.find(post => post.path === this.path)
      this.post.author = a.author
      this.post.china = a.china
      this.post.content = a.content
      this.post.title = a.title
      this.post.path = a.path
      this.post.name = a.name
      this.post.time = a.time
      this.post.id = a.id
      this.checkCN()
    }
  },
  beforeMount () {
  },
  components: {
    Comments
  },
  watch: {
    isCN () {
      console.log('CN Status changed')
      this.checkCN()
    }
  },
  props: ['path']
}
</script>
<style lang="less" scoped>
#content img {
  width: 100%;
}
</style>
<style lang="less">

</style>
