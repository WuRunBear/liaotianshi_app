export default {
  namespaced: true,
  state: {
    token: '',
    info: {
      number: 1234567891,
      userName: '测试用户自己',
      picture: ''
    }
  },
  mutations: {
    // setNewMsgCount(state, data) {
    //   if (data) {
    //     state.newMsgCount += data
    //   } else {
    //     state.newMsgCount++
    //   }
    // }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserInfo(state) {
      return state.info;
    }
  },
  actions: {
    login() {
      
    },
    logout() {
      
    }
  },
}