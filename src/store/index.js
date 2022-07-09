import { createStore } from 'vuex'

export default createStore({
  state: {
    fontsize: '18',
    isCN: true,
    model: '',
    all: {}
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
    }
  },
  actions: {
  },
  modules: {
  }
})
