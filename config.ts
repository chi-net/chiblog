// const nuxt = useNuxtApp()
// const config = nuxt.$config
// let data = {
//   model: 'production', // mocks is the mockdata in mocks folder; production uses the mock2get json file.
//   settings: 'http://127.0.0.1:3000/mock.1.1.2.json'  
// }
// console.log(config)
// if (config.CHIBLOG_CONFIG_TYPE !== undefined) {
//   data.model = config.CHIBLOG_CONFIG_TYPE
//   data.settings = config.CHIBLOG_CONFIG_URL
// }
// export default data
export default {
  model: 'mocks', // mocks is the mockdata in mocks folder; production uses the mock2get json file.
  settings: 'http://127.0.0.1:3000/chiblog.json' 
}