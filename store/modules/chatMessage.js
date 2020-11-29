export default {
  namespaced: true,
  state: {
    newMsgCount: 0
  },
  mutations: {
    setNewMsgCount(state, data) {
      if (data) {
        state.newMsgCount += data
      } else {
        state.newMsgCount++
      }
    }
  },
  getters: {
    getNewMsgCount(state) {
      return state.newMsgCount;
    }
  },
  actions: {},
}