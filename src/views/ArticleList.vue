<template>
  <div id="article-list">
    <h2>文章列表</h2>
    <h2 v-if="isCN">由于您目前位于中国大陆地区，为符合中国大陆的法律法规，已将部分内容进行隐藏。<br/><small>如果您已经确定您正在使用非中国大陆IP访问，请刷新页面并等待5-10秒......</small></h2>
    <ol>
      <div v-for="i in posts" :key="i.id">
        <div class="article" v-if="ifcn(i.china)"><li><router-link :to="'/articles/' + i.path">{{i.title}}</router-link></li></div>
      </div>
    </ol>
  </div>
</template>

<script>
import posts from '@/mocks/posts'
export default {
  data () {
    return {
      font: 12
    }
  },
  computed: {
    fonta () {
      return this.font + 'px'
    },
    posts () {
      return posts
    },
    isCN () {
      return this.$store.state.isCN
    }
  },
  mounted () {
    console.log(posts)
  },
  methods: {
    ifcn (china) {
      if (this.$store.state.isCN === true) {
        if (china === true) { // if in China? and post support china
          console.log('in china')
          return true
        } else {
          return false
        }
      } else { // abroad
        console.log('abroad')
        return true
      }
    }
  },
  watch: {
    isCN () {
      this.$forceUpdate()
    }
  }
}
</script>
<style scoped>
a:link,a:visited {
  color: black;
  text-decoration: none;
}
a:hover,a:active {
  color: cyan;
}
</style>
