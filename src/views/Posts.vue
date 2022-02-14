<template>
  <div class="q-pa-md">
    <q-card flat class="card">
      <!-- <q-skeleton height="150px" square /> -->
      <q-img
        :src="post.img"
        spinner-color="white"
        style="max-height: 150px"
      />
      <q-card-section>
        <div class="text-h3">
          {{post.title}}
        </div>
        <span class="text-h4">
          <q-icon name="mdi-account"/>{{post.author}}&nbsp;
          <q-icon name="mdi-account-clock"/>{{time}}&nbsp;
        </span>
        <div v-html="this.content">
        </div>
      </q-card-section>
    </q-card>
    <q-card flat>
      <q-card-section>
        <div class="text-h3">假装这是个评论系统qwq</div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
// import { ref } from 'vue'
import posts from '@/mocks/posts.js'
import { marked } from 'marked'
export default {

  components: {
  },

  data () {
    return {
      post: {
        title: 'Loading',
        author: 'Loading',
        content: 'Loading',
        lastedit: '0',
        img: ''
      }
    }
  },
  mounted () {
    console.log(this.$route.params.postid)
    console.log(posts)
    const currentPost = posts.find(index => index.id === parseInt(this.$route.params.postid))
    this.post = currentPost
    console.log(currentPost)
    console.log(this.post)
  },
  computed: {
    time () {
      const d = new Date()
      d.setTime(this.post.lastedit * 1000)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    },
    content () {
      return marked.parse(this.post.content)
    }
  }
}
</script>
<style lang="less">
@import "../styles/importme.less";
</style>
