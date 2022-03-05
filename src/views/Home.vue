<template>
  <div>
    <div v-for="p in posts" :key="p.id">
      <PostCard :post="p"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PostCard from '@/components/PostCard.vue'
import posts from '@/mocks/posts'// Mock用 todo:改了它
export default {
  name: 'Home',
  components: {
    PostCard
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
