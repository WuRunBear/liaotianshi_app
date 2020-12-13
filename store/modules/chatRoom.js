export default {
  namespaced: true,
  state: {
    playing_audio: null,
  },
  mutations: {
    setPlaying_audio(state, obj) {
      let playing_audio = state.playing_audio;
      if(playing_audio) {
        playing_audio.stop();
      }
      state.playing_audio = obj;
    }
  },
  getters: {
    playing_audio(state) {
      return state.playing_audio;
    }
  }
}