export default ({ store }, inject) => {
  inject('pushError', (title, e) => {
    store.commit('setGlobalDialog', {
      title,
      content: e?.response?.data?.message || 'Erro interno do servidor, tente novamente mais tarde.',
      show: true
    })
  })
}
