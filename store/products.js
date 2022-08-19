export const state = () => ({
  products: [],
  selectedVariant: []
})

export const mutations = {
  addProduct (state, product) {
    if (state.products.filter(prod => prod.urlNumber === product.urlNumber).length < 1) {
      state.products.push(product)
    }
  },
  setSelectedVariant (state, variant) {
    state.selectedVariant = variant
  },
  toggleFavorite (state, urlNumber) {
    const product = state.products.filter(product => product.urlNumber === urlNumber)[0]
    product.favorite = !product.favorite
  }
}

export const getters = {
  getVariantsOptions: _ => (variants, selectedItems, optionSelected) => {
    let options = []
    if (optionSelected === 0) {
      Array.from(
        new Set(
          variants.options.map(
            option => option.names[optionSelected]
          )
        )
      ).forEach(
        optionName => options.push(optionName)
      )
    } else {
      options = Array.from(
        new Set(
          variants.options.filter(
            option => new Set(
              option.names.concat(
                selectedItems.filter(
                  (_, index) => index < optionSelected)
              )
            ).size === option.names.length
          ).map(
            option => option.names[optionSelected]
          )
        )
      )
    }
    return options
  },
  getPrice: _ => (variant) => {
    if (variant.type === 'unique') {
      return Number(variant.option.price.value)
    } else {
      const prices = Array.from(new Set(variant.options.map(option => option.price.value)))
      return { min: Math.min(...prices), max: Math.max(...prices) }
    }
  },
  disableBuyActions: state => (product) => {
    if (product.variants?.type === 'compound') {
      return state.selectedVariant.length !== product.variants.attributes.length
    } else if (product.variants?.type === 'simple') {
      return state.selectedVariant.length !== 1
    } else {
      return false
    }
  },
  getVariantQuantity: state => (variants) => {
    if (variants?.type === 'compound') {
      const variant = variants.options.filter((option) => {
        const verify = option.names.map((name, i) => state.selectedVariant[i] === name)
        return verify.every(item => item)
      })[0]
      return variant?.stock || 1
    } else if (variants?.type === 'simple') {
      const variant = variants.options.filter(option => option.name === state.selectedVariant[0])[0]
      return variant?.stock || 1
    } else {
      return variants?.option?.stock || 1
    }
  },
  getSelectedPrice: state => (variants) => {
    if (variants?.type === 'compound') {
      return Number(variants.options.filter(option => option.names.join(' ') === state.selectedVariant.join(' '))[0]?.price?.value || 0)
    } else if (variants?.type === 'simple') {
      return Number(variants.options.filter(option => option.name === state.selectedVariant[0])[0]?.price?.value || 0)
    } else {
      return 0
    }
  }
}
