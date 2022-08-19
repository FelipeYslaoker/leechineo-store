export const state = () => ({
  error: '',
  globalDialog: {
    title: '',
    content: '',
    show: false
  },
  publicKey: ''
})

export const mutations = {
  setGlobalDialog (state, { title, content, color, show }) {
    state.globalDialog = { title, content, color, show }
  },
  setError (state, e) {
    state.error = e
  },
  setPublicKey (state, key) {
    state.publicKey = key
  }
}
