import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('global', () => {
  // const fontsize = ref('18')
  const isCN = ref(true)
  const model = ref('')
  const all = ref({})
  const commentdata = ref({})
  return { isCN, model, all, commentdata }
  // fcn (state) {
  //   state.isCN = false
  // },
  // updmodel (state, model) {
  //   state.model = model
  // },
  // updall (state, all) {
  //   state.all = all
  // },
  // updcmt (state, cmt) {
  //   state.commentdata = cmt
  // }
})
