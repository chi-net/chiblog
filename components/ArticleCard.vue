<script setup>
import { renderTime } from '~/scripts/renderTime'
import { renderNumber } from '~/scripts/renderNumber'

const props = defineProps({
  posts: Object,
  comments: Object,
  settings: Object
})

const settings = reactive(props.settings)
// let placeimages = ref([])

const sortedposts = []
props.posts.forEach((element) => {
  if (element.banner === undefined) {
    if (settings.site.articleimage.enabled) {
      element.banner = settings.site.articleimage.images[Math.floor(Math.random() * settings.site.articleimage.images.length)]
    } else {
      element.banner = ''
    }
  }
  if (element.pinned === true) {
    sortedposts.unshift(element)
  } else {
    sortedposts.push(element)
  }
})

</script>
<template>
  <div v-for="i in sortedposts" :key="i.id">
    <div class="m-2" :id="'posts-' + i.id">
      <section class='p-2'>
        <Card v-if="i.banner !== undefined" :img="i.banner">
          <div class="m-4">
              <div class="text-2xl font-bold" v-if="i.pinned !== undefined ? i.pinned : false" id="pin"><Icon name="pin" /><span style="font-size: 18px;">置顶文章</span></div>
              <h2 :id="'posts-title-' + i.id" class="text-2xl font-bold pl-2">
                <nuxt-link :to="'/posts/' + i.path">{{ i.title }}</nuxt-link>
              </h2>
              <div id="infoset">
                <div class="set"><Icon name="account" /><span><nuxt-link :to="'/author/' + i.author">{{ i.author }}</nuxt-link></span></div>
                <div class="set"><Icon name="clockoutline" /><span>{{renderTime(i.time) }}</span></div>
                <div class="set"><Icon name="accountarrowup" /><span>{{ renderTime(i.updtime) }}</span></div>
                <div class="set"><div v-if="settings.site.comment.backend.type === 'chicomment-simple'"><Icon name="comment" />{{ props.comments.filter((comment) => comment.to === i.id).length }}</div></div>
                <div class="set"><Icon name="book" /><span><nuxt-link :to="'/category/' + i.category">{{ i.category !== undefined ? i.category : '未分类' }}</nuxt-link></span></div>
                <div v-if="settings.site.textcount.article !== undefined ? settings.site.textcount.article : true" class="set"><Icon name="textCount" /><span>{{ renderNumber(i.content.length) }}字</span></div>
              </div>
              <div :id="'posts-desc' + i.id" class='pstdesc'>
                {{ i.desc !== undefined ? i.desc : '本文章未提供摘要。' }}
              </div>
          </div>
        </Card>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
a:link,
a:visited {
  color: black;
  text-decoration: none;
}
a:hover,
a:active {
  color: cyan;
}
a {
  transition: color 200ms ease-in-out;
}
.loading {
  width: 32px;
}
#pin {
  display: flex;
  justify-items: center;
  padding: 4px;
}
#infoset {
  display: flex;
  flex-wrap: wrap;
}
div.set {
  display: flex;
  justify-content: center;
  span {
    vertical-align: middle;
    font-size: 18px;
  }
  padding: 4px;
}
.pstdesc {
  font-size: 18px;
  padding: 4px;
}
</style>
