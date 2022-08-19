<template>
  <v-row class="mb-10">
    <v-col
      v-for="(product, i) in products"
      :key="i"
      cols="6"
      md="12"
    >
      <v-sheet
        color="grey lighten-4"
        class="my-2 mb-3 rounded-lg"
        @click="$router.push(`/produto/${product.urlNumber}`)"
      >
        <template v-if="product">
          <v-img v-if="product.images[0]" :src="product.images[0]" class="rounded-tr-lg rounded-tl-lg" height="120px" />
          <v-sheet color="transparent" class="ma-3">
            <v-sheet :class="`text-caption text-truncate font-weight-medium ${product.images[0] ? '' : 'pt-3'}`" color="transparent">
              {{ product.name }}
            </v-sheet>
            <div class="font-weight-bold primary--text">
              R${{ product.variants.type === 'unique' ? $store.getters['products/getPrice'](product.variants).toFixed(2).replace('.', ',') : `${$store.getters['products/getPrice'](product.variants).min.toFixed(2).replace('.', ',')}` }}
            </div>
            <div class="pb-3">
              <v-icon size="15" color="primary">
                star
              </v-icon>
              <span class="text-caption primary--text">4,6</span>
            </div>
          </v-sheet>
        </template>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
async function getData (Vue) {
  const response = await Vue.$axios.$get('/products/get?page=1&limit=5')
  Vue.products = response || []
  for (const product of response) {
    Vue.$store.commit('products/addProduct', product)
  }
}

export default {
  data () {
    return {
      products: []
    }
  },
  async fetch () {
    await getData(this)
  },
  async beforeMount () {
    if (!this.products) {
      if (this.products.length < 1) {
        await getData(this)
      }
    }
  }
}
</script>

<style>

</style>
