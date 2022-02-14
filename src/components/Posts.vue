<template>
  <div class="q-pa-md outer">
    <q-card flat class="pointer-cursor card" @click="$router.push('/posts/' + this.post.id)">
      <!-- <q-skeleton height="150px" square /> -->
      <q-img
        :src="post.img"
        spinner-color="white"
        style="max-height: 150px"
      />
      <q-card-section>
        <div class="text-h4">
          {{post.title}}
        </div>
        <span class="text-h5">
          <q-icon name="mdi-account"/>{{post.author}}&nbsp;
          <q-icon name="mdi-account-clock"/>{{time}}&nbsp;
        </span>
        <div class="text-h5">
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
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes()
    }
  }
}
</script>
<style lang="less">
@import '../styles/importme.less';
.card {
  @media screen and (min-width: 768px) {
    max-width: 100% !important;
  }
}
.outer {
  @media screen and (min-width: 768px) {
    // float: left;
  }
}
</style>
