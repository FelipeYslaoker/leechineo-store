import Vue from 'vue'

Vue.filter('toBRL', (value) => {
  return value.toLocaleString('pt-br', { minimumFractionDigits: 2 })
})
