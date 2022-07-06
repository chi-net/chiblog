<template>
  <div :style="{fontSize: fsize}">
    <div id="toolbar-container">
      <div id="toolbar-title">
        工具箱
      </div>
      <div id="toolbar-index">
        <div class="toolbar-item">
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            testestetststetstestteettstettstetstetstetse
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    fsize () {
      return this.$store.state.fontsize + 'px'
    }
  },
  beforeDestory () {
  },
  mounted () {
  },
  beforeMount () {
  },
  components: {
  }
}
</script>
<style lang="less" scoped>
#toolbar {
  &-container {
    backdrop-filter: blur(5px);
    word-break: break-all;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    @media screen and (min-width: 768px) {
      margin-left: 20%;
      margin-right: 20%;
      margin-top: 16px;
    }
    padding: 8px;
    box-shadow:8px 6px 4px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    border-width: 8px;
    border-color: #000;
  }
  &-title {
    font-size: 1em;
    width: 100%;
    text-align: center;
  }
}
</style>
<style lang="less">

</style>
