<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title @click="this.$router.push('/')" class="pointer-cursor">
          chihuo2104の部落格
        </q-toolbar-title>

        <div>未登录</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>链接们</q-item-label>
        <q-item clickable tag="a" href="/login">
          <q-item-section avatar>
            <q-icon name="mdi-account" />
          </q-item-section>
          <q-item-section>
            <q-item-label>登录-管理后台</q-item-label>
          </q-item-section>
          </q-item>
        <q-item clickable tag="a" href="/friends">
          <q-item-section avatar>
            <q-icon name="mdi-account-multiple" />
          </q-item-section>
          <q-item-section>
            <q-item-label>友人帐</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://im.chihuo2104.dev">
          <q-item-section avatar>
            <q-icon name="mdi-account-circle" />
          </q-item-section>
          <q-item-section>
            <q-item-label>关于博主</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.com/chihuo2104/chiblog-frontend">
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Powered by chiblog@dev</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-ajax-bar
        ref="bar"
        position="top"
        color="blue"
        size="5px"
        skip-hijack
      />
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
// import { ref } from 'vue'

export default {

  components: {
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  mounted () {
    this.$router.beforeEach((to, from, next) => {
      // this.$refs.
      console.log(to)
      console.log(from)
      this.$refs.bar.start()
      next()
      // ...
      // 返回 false 以取消导航
    })
    this.$router.afterEach((to, from) => {
      this.$refs.bar.stop()
    })
  }
}
</script>
<style lang="less">
@import "./styles/importme.less";
#app {
  font-family: "Genshin"
}
</style>
