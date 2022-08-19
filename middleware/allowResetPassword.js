export default async function ({ store, route, redirect, app }) {
  if (!(store.state.auth.loggedIn || route.query.token)) {
    return redirect('/')
  }
  if (route.query.token) {
    const response = await app.$axios.$post('/auth/reset-or-confirm-token-is-valid', {
      request: 'reset',
      token: route.query.token
    })
    if (!response.valid) {
      store.commit('setGlobalDialog', {
        title: 'Link inválido',
        content: 'O link de redefinição de senha está inválido ou expirado. Por favor, solicite outro email de redefinição.',
        show: true
      })
      return redirect('/')
    }
  }
}
