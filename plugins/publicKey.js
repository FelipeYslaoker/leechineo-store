import Cryptr from 'cryptr'

export default ({ app, store }, inject) => {
  inject('publicKey', () => {
    const logged = store.state.auth?.loggedIn
    if (!logged) {
      return ''
    } else if (store.state.publicKey) {
      return store.state.publicKey
    } else {
      const user = store.state.auth.user
      const cryptr = new Cryptr(user.id)
      const key = cryptr.encrypt(user.cpf)
      store.commit('setPublicKey', key)
      return key
    }
  })
}
