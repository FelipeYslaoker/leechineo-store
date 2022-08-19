export default async function ({ store, route, redirect, app }) {
  if (route.query.token) {
    const response = await app.$axios.$post('/auth/reset-or-confirm-token-is-valid', {
      request: 'confirm',
      token: route.query.token
    })
    if (!response.valid) {
      store.commit('setGlobalDialog', {
        title: 'Link inválido',
        content: 'O link de confirmação de email está inválido ou expirado. Por favor, solicite outro email de confirmação.',
        show: true
      })
      return redirect('/')
    }
  }
}
