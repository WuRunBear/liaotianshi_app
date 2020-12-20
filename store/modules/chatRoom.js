export default {
  namespaced: true,
  state: {
    playing_audio: null,
  },
  mutations: {
    setPlaying_audio(state, obj) {
      state.playing_audio = obj;
    },
    delPlaying_audio(state) {
      state.playing_audio = null;
    }
  },
  getters: {
    playing_audio(state) {
      return state.playing_audio;
    }
  }
}