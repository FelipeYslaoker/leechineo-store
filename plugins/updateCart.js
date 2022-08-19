export default ({ app, store }, inject) => {
  inject('updateCart', async () => {
    if (store.state.auth?.loggedIn) {
      const cartItems = await app.$axios.$get('/user/cart')
      store.commit('cart/setCart', cartItems)
    }
  })
}
