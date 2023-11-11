<script setup>
const props = defineProps({
  settings: Object,
  pages: Object,
  posts: Object,
  route: Object
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

// eslint-disable-next-line vue/no-setup-props-destructure
const $route = props.route

let post = reactive({})

function refresh () {
  if ($route.name === 'posts-path') {
    post = posts.filter((ele) => {
      return $route.path === '/posts/' + ele.path
    })[0]
    // if (post !== undefined) {
    //   console.log(post)
    // }
  }
}
$router.afterEach(refresh)
refresh()

const isshow = computed(() => {
  if (show.value) return 'close'
  else return 'menu'
})

// console.log($route.name)
</script>
<template>
  <header class="transition-all text-2xl font-bold p-4 fixed left-0 right-0 top-0 flex justify-between flex-col backdrop-blur-sm">
    <div id="header-index" class="backdrop-blur-sm">
      <div id="set-mob">
        <h2 id="title">
          <nuxt-link to="/">{{ settings.site.title }}</nuxt-link>
        </h2>
      </div>
<!--      <h2 id="pages-pc-toolbar" v-if="post !== undefined && $route.name === 'posts-path'">-->
<!--        {{ post.title }}-->
<!--      </h2>-->
      <div id="pages-mob-an" @click="changePagesShowData">
        <h2><Icon :name="isshow"/></h2>
      </div>
    </div>
    <div id="pages" :style="{ display: show ? 'flex' : 'none' }">
      <span v-for="i in pages" :key="i.id">
        <div v-if="i.type === 'link'" class="pr-2 m-1">
          <h2 class="page-link">
            <a :href="i.url" :target="i.target">{{ i.title }}</a>
          </h2>
        </div>
        <div v-if="i.type === 'article'" class="pr-2 m-1">
          <h2 class="page-link">
            <nuxt-link :to="'/' + i.name">{{ i.title }}</nuxt-link>
          </h2>
        </div>
      </span>
    </div>
  </header>
</template>
<style lang="scss" scoped>
#header-index {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
#header {
  display: flex;
  position: fixed;
  @media screen and (min-width: 768px) {
    top: 0.25em;
    margin-left: 20%;
    margin-right: 20%;
    width: 60%;
    border-radius: 4px;
    justify-content: space-between;
  }
  flex-direction: column;
  @media screen and (max-width: 768px) {
    top: 0;
    left: 0;
    right: 0;
  }
  backdrop-filter: blur(10px);
  z-index: 10;
  #pages-pc-toolbar {
    display: none;
  }
}

#header-sm {
  flex-direction: column;
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
  backdrop-filter: blur(10px);
  z-index: 10;
}

#pages-pc-toolbar {
  @media screen and (max-width: 1365px) {
    display: none;
  }
  position: fixed;
  left: calc(25% + 4px);
  right: 25%;
}

#pages-mob-an {
  cursor: pointer;
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


</style>
