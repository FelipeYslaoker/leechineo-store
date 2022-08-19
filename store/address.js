export const state = () => ({
  items: [],
  selected: 0
})

export const mutations = {
  addAddress (state, address) {
    if (!(state.items.filter(_address => _address._id === address._id).length)) {
      state.items.push(address)
    }
  },
  setSelected (state, selected) {
    state.selected = selected
  },
  deleteItem (state, id) {
    const address = state.items.find(_address => _address._id === id)
    const index = state.items.indexOf(address)
    state.items.splice(index, 1)
  }
}
