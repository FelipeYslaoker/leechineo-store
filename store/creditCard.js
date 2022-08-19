export const state = () => ({
  items: [],
  selected: 0
})

export const mutations = {
  addItem (state, item) {
    if (!state.items.find(card => card.id === item.id)) {
      state.items.push(item)
    }
  },
  setCards (state, cards) {
    state.items = cards
  },
  setSelected (state, selected) {
    state.selected = selected
  },
  deleteItem (state, id) {
    const card = state.items.find(_card => _card.id === id)
    const index = state.items.indexOf(card)
    state.items.splice(index, 1)
  }
}
