<script setup>
const props = defineProps({
  posts: Object,
  comments: Object,
  settings: Object
})
function renderTime (time) {
  const currentTime = new Date()
  const relTime = new Date(time * 1000)
  const offset = Math.floor((currentTime.getTime() - relTime.getTime()) / 1000)
  if (offset < 60 && offset > 0) {
    return offset + '秒前'
  } else if (offset > 60 && offset < 60 * 60) {
    return Math.floor(offset / 60) + '分钟前'
  } else if (offset > 60 * 60 && offset < 60 * 60 * 24) {
    return Math.floor(offset / (60 * 60)) + '小时前'
  } else if (offset > 60 * 60 * 24 && offset < 60 * 60 * 24 * 30) {
    return Math.floor(offset / (60 * 60 * 24)) + '天前'
  } else if (offset > 60 * 60 * 24 * 30 && offset < 60 * 60 * 24 * 30 * 12) {
    return Math.floor(offset / (60 * 60 * 24 * 30)) + '个月前'
  } else if (offset > 60 * 60 * 24 * 30 * 12 && offset < 60 * 60 * 24 * 30 * 12 * 3) {
    return Math.floor(offset / (60 * 60 * 24 * 30 * 12)) + '年前'
  } else {
    return relTime.getFullYear() + '-' + (relTime.getMonth() + 1) + '-' + relTime.getDate()
  }
}
function renderNumber (num){
  if (num > 100000) {
    return Math.round((num / 10000) * 100) / 10 + 'w'
  } else if (num > 1000) {
    return Math.round((num / 10000) * 100) / 10 + 'k'
  } else {
    return num
  }
}

const sortedposts = []
props.posts.forEach(element => {
  if (element.pinned === true) {
    sortedposts.unshift(element)
  } else {
    sortedposts.push(element)
  }
})
</script>
<template>
  <div v-for="i in sortedposts" :key="i.id">
    <div class="article" :id="'posts-' + i.id">
      <!-- image thanks to SKIPM4 https://skipm4.com -->
      <Card img="/shojo.gif">
        <h3 v-if="(i.pinned !== undefined)?i.pinned:false"><Icon name="pin"/>置顶文章</h3>
        <h3 :id="'posts-title-' + i.id"><nuxt-link :to="'/posts/' + i.path">{{i.title}}</nuxt-link></h3>
        <Icon name="account"/>{{i.author}}&nbsp;
        <Icon name="clockoutline"/>{{renderTime(i.time)}}&nbsp;
        <Icon name="accountarrowup"/>{{renderTime(i.updtime)}}&nbsp;
        <Icon name="comment"/>{{props.comments.filter(comment => comment.to === i.id).length}}
        <Icon name="book"/>{{(i.category !== undefined)? i.category : '未分类'}}
        <span v-if="(settings.site.textcount.article !== undefined)?settings.site.textcount.article:true"><Icon name="textCount"/>{{ renderNumber(i.content.length) }}字</span>
        <div :id="'posts-desc' + i.id">{{(i.desc !== undefined)? i.desc : '本文章未提供摘要。'}}</div>        
      </Card>
    </div>
  </div>
</template>
<style lang="scss" scoped>
a:link,a:visited {
  color: black;
  text-decoration: none;
}
a:hover,a:active {
  color: cyan;
}
</style>