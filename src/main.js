import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vant from 'vant'
import 'vant/lib/index.css';
import axios from './request/axios'
import api from './api'

Vue.use(vant)
Vue.use(axios)
Vue.use(api)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
