import { createStore } from 'vuex'

export default createStore({
  state: {
    fontsize: '18',
    isCN: true,
    model: '',
    all: {},
    commentdata: {}
  },
  mutations: {
    fcn (state) {
      state.isCN = false
    },
    updmodel (state, model) {
      state.model = model
    },
    updall (state, all) {
      state.all = all
    },
    updcmt (state, cmt) {
      state.commentdata = cmt
    }
  },
  actions: {
  },
  modules: {
  }
})
