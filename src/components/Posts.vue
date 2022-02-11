<template>
  <div class="q-pa-md">
    <q-card flat class="pointer-cursor" @click="$router.push('/posts/' + this.post.id)">
      <!-- <q-skeleton height="150px" square /> -->
      <q-img
        :src="post.img"
        spinner-color="white"
        style="height: 150px"
        :ratio="16/9"
      />
      <q-card-section>
        <div class="text-h3">
          {{post.title}}
        </div>
        <span class="text-h4">
          <q-icon name="mdi-account"/>{{post.author}}&nbsp;
          <q-icon name="mdi-account-clock"/>{{time}}&nbsp;
        </span>
        <div class="text-h4">
          {{post.desc}}
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  computed: {
    time () {
      const d = new Date()
      d.setTime(this.post.lastedit * 1000)
      return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    }
  }
}
</script>
<style>
@import '../styles/importme.less';
</style>
