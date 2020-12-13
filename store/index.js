import Vue from 'vue'
import Vuex from 'vuex'
import chatMessage from './modules/chatMessage.js'
import chatRoom from './modules/chatRoom.js'
import user from './modules/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    chatMessage,
    chatRoom,
    user
  }
})
