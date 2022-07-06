import { createStore } from 'vuex'

export default createStore({
  state: {
    fontsize: '18',
    isCN: true
  },
  mutations: {
    fcn (state) {
      state.isCN = false
    }
  },
  actions: {
  },
  modules: {
  }
})
