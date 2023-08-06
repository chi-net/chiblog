<script setup>
const props = defineProps({
  settings: Object,
  pages: Object,
  posts: Object
})
const show = ref(false)
const settings = ref(props.settings)
let pages = reactive(props.pages)
let posts = reactive(props.posts)
// const height = ref("100%")
function changePagesShowData() {
  // 增加动画

  show.value = !show.value
}

const $router = useRouter()

$router.beforeEach(() => {
  show.value = false
})

const id = ref('header')
function handleScroll () {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    id.value = 'header-sm'
  } else {
    id.value = 'header'
  }
}


onMounted(() => {
  window.onscroll = handleScroll
})

const $route = useRoute()

let post = reactive()

// 这说明进入了...
if ($route.name === 'posts-path') {
  post = posts.filter((ele) => {
    return $route.path === '/posts/' + ele.path
  })[0]
  if (post !== undefined) {

  }
}
// console.log($route.name)
</script>
<template>
  <header :id="id" class="trans">
    <div id="set-mob">
      <h2 id="title">
        <nuxt-link to="/">{{ settings.site.title }}</nuxt-link>
      </h2>
      <div id="pages-mob-an" @click="changePagesShowData">
        <h2>链接</h2>
      </div>
    </div>
    <h2 id="pages-pc-article" v-if="post !== undefined">
      {{ post.title }}
    </h2>
    <div id="pages-pc">
      <span v-for="i in pages" :key="i.id">
        <div v-if="i.type === 'link'">
          <h2 class="page-link">
            <a :href="i.url" :target="i.target">{{ i.title }}</a>
          </h2>
        </div>
        <div v-if="i.type === 'article'">
          <h2 class="page-link">
            <nuxt-link :to="'/' + i.name">{{ i.title }}</nuxt-link>
          </h2>
        </div>
      </span>
    </div>
    <div id="pages-mob" :style="{ display: show ? 'block' : 'none' }">
      <span v-for="i in pages" :key="i.id">
        <div v-if="i.type === 'link'">
          <h2 class="page-link">
            <a :href="i.url" :target="i.target">{{ i.title }}</a>
          </h2>
        </div>
        <div v-if="i.type === 'article'">
          <h2 class="page-link">
            <nuxt-link :to="'/' + i.name">{{ i.title }}</nuxt-link>
          </h2>
        </div>
      </span>
    </div>
  </header>
</template>
<style lang="scss" scoped>
#header {
  display: flex;
  position: fixed;
  @media screen and (min-width: 768px) {
    top: 0.25em;
    margin-left: 20%;
    margin-right: 20%;
    width: 60%;
    border-radius: 4px;
    //border: #eeeeee solid 1px;
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) {
    top: 0;
    left: 0;
    right: 0;
    flex-direction: column;
  }
  //left: 0;
  //right: 0;
  backdrop-filter: blur(10px);
  z-index: 10;
  #pages-pc-article {
    display: none;
  }
}

#header-sm {
  width: 100%;
  display: flex;
  position: fixed;
  @media screen and (min-width: 768px) {
    top: 0;
    left: 0;
    right: 0;
    //border: #eeeeee solid 1px;
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) {
    top: 0;
    left: 0;
    right: 0;
    flex-direction: column;
  }
  //left: 0;
  //right: 0;
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

#pages-pc-article {
  @media screen and (max-width: 768px) {
    display: none;
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

.page-link, #title {
  a, a:visited {
    color: black;
    text-decoration: none;
  }
  a {
    transition: color 200ms ease-in-out;
  }
  a:hover {
    color: cyan;
  }
}
.likeh2 {
  margin: 8px;
  font-size: 2em;
}

.trans {
  transition: all 300ms ease-in-out;
}


</style>
