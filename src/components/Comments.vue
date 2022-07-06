<template>
  <div>
    <h2>已有{{clist.length}}条评论</h2>
    <div id="comment-in" v-for="i in clist" :key="i.id">
      <div :id="'comments-' + i.id">
        <img :src="'//g.chicdn.cn/avatar/' + md5(i.email) + '?s=96&d=monsterid&r=g'" :alt="'the avatar of' + i.name"/>
        &nbsp;<a :href="i.site" _target="_blank" class="likeh3">{{ i.name }}</a>
        <span class="likeh3">于{{(new Date(i.time * 1000)).toLocaleString()}}
        <span v-if="i.reply === -1">评论道</span>
        <span v-else>回复<router-link class="reply" :to="'#comments-' + i.reply">{{comments[i.reply - 1].name}}</router-link></span></span>
        <!-- {{i}} -->
        <div v-html="parse(i.content)" class="comments-content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from 'md5'
import comments from '@/mocks/comments'
import { marked } from 'marked'
export default {
  data () {
    return {
      clist: []
    }
  },
  methods: {
    md5 (str) {
      return md5(str)
    },
    parse (str) {
      return marked.parse(str)
    }
  },
  computed: {
    comments () {
      return comments
    }
  },
  beforeDestory () {
  },
  mounted () {
    console.log(this.pid)
    this.clist = comments.filter(comment => comment.to === this.pid)
  },
  beforeMount () {
  },
  components: {
  },
  props: ['pid']
}
</script>
<style lang="less" scoped>
a,a:visited {
  color: black;
  text-decoration: none;
}
a:hover,a:active {
  color: cyan;
  text-decoration: none;
}
.likeh3 {
  font-size: 1.5em;
}
.comments-content img {
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    width: 50%;
  }
}
.reply {
  display: inline;
}
</style>
<style lang="less">

</style>
