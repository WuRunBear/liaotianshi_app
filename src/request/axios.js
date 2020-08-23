import axios from 'axios'
import store from '../store/'

class Ajax {
  constructor() {
    this.axios = axios
  }

  get(url, data = {}, config = {}) {
    config['params'] = data
    return this.axios.get(url, config)
  }

  post(url, data = {}, config = {}) {
    return this.axios.post(url, data, config)
  }
}

export default {
  install(Vue) {
    Vue.prototype.$axios = new Ajax()
  }
}