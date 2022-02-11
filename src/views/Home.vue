<template>
  <div>
    <div v-for="p in posts" :key="p.id">
      <Post :post="p"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Posts.vue'
import posts from '@/mocks/posts'// Mock用 todo:改了它
export default {
  name: 'Home',
  components: {
    Post
  },
  data () {
    return {
      posts: posts
    }
  },
  mounted () {
    console.log(posts)
  }
}
</script>
