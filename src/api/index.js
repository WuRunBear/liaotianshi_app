const api = require.context('./', true, /\/.+\/index\.js$/)

export default {
  install(Vue) {
    let axios = Vue.prototype.$axios
    let _api = {}
    api.keys().forEach(key => {
      let m = api(key).default
      _api[m.name] = new m(axios)
    });
    Vue.prototype.$api = _api
  }
}