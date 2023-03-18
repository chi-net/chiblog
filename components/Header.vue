<script setup>
const props = defineProps({
  settings: Object,
  pages: Object
})
const show = ref(false)
const settings = props.settings
const pages = props.pages
const height = ref("100%")
function changePagesShowData () {
  // 增加动画

  show.value = !(show.value)
}
</script>
<template>
  <div id="header">
    <div id="set-mob">
      <h2 id="title"><nuxt-link to="/">{{ settings.site.title }}</nuxt-link></h2>
      <div id="pages-mob-an" @click="changePagesShowData">
        <h2>链接</h2>
    </div>
    </div>
    <div id="pages-pc">
      <span v-for="i in pages" :key="i.id">
        <div v-if="i.type === 'link'">
          <h2 class="page-link"><a :href="i.url" :target="i.target">{{ i.title }}</a></h2>
        </div>
        <div v-if="i.type === 'article'">
          <h2 class="page-link"><nuxt-link :to="'/' + i.name">{{ i.title }}</nuxt-link></h2>
        </div>
      </span>
    </div>
    <div id="pages-mob" :style="{ display: (show)?'block':'none',height: height }">
      <span v-for="i in pages" :key="i.id">
        <div v-if="i.type === 'link'">
          <h2 class="page-link"><a :href="i.url" :target="i.target">{{ i.title }}</a></h2>
        </div>
        <div v-if="i.type === 'article'">
          <h2 class="page-link"><nuxt-link :to="'/' + i.name">{{ i.title }}</nuxt-link></h2>
        </div>
      </span>
    </div>
  </div>
</template>
<style lang="less" scoped>
#header {
  display: flex;
  position: fixed;
  @media  screen and (min-width: 768px) {
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  top: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(10px);
  z-index: 10;
}
#pages-pc {
  @media screen and (max-width: 768px) {
    display: none;
  }
  @media screen and (min-width: 768px) {
    display: flex;
  }
}
#pages-mob-an {
  @media screen and (min-width: 768px) {
    display: none;
  }
  cursor: pointer;
}
#pages-mob {
  @media screen and (min-width: 768px) {
    display: none;
  }
}
#set-mob {
  display: flex;
  justify-content: space-between;
}
.page-link a,.page-link a:visited {
  color: black;
  text-decoration: none;
}
.page-link a:hover {
  color: cyan;
}
#title a,#title a:visited {
  color: black;
  text-decoration: none;
}
#title a:hover {
  color: cyan;
}
.likeh2 {
  margin: 8px;
  font-size: 2em;
}
</style>