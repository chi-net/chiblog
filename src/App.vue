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

        <q-toolbar-title>
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
        <q-item clickable tag="a" target="_blank" href="/login">
          <q-item-section avatar>
            <q-icon name="mdi-account" />
          </q-item-section>
          <q-item-section>
            <q-item-label>登录-管理后台</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="/friends">
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
        <q-item clickable tag="a" target="_blank" href="https://github.com/chihuo2104/chiblog">
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
  }
}
</script>
