export const state = () => ({
  items: [],
  loaded: false
})

export const mutations = {
  addItem (state, item) {
    if (!state.items.filter(cartItem => cartItem.id === item.id)[0]) {
      state.items.push(item)
    }
  },
  setCart (state, cart) {
    state.items = cart
  },
  setLoaded (state) {
    state.loaded = !state.loaded
  }
}

export const getters = {
  totalPrice (state) {
    return state.items.map(item => item.price.final * item.quantity || item.price.base * item.quantity).reduce((previous, current) => current + previous, 0)
  },
  basePrice (state) {
    return state.items.map(item => item.price.base * item.quantity).reduce((previous, current) => current + previous, 0)
  }
}
