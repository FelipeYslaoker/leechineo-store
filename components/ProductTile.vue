<template>
  <div>
    <v-row class="pa-1">
      <v-col
        v-for="(item, i) in section.items"
        :key="i"
        class="pa-1"
        cols="6"
        sm="4"
        md="3"
        lg="3"
        xl="2"
      >
        <v-sheet
          @click="goTo(products.filter(product => product.urlNumber === item.product)[0].urlNumber)"
        >
          <v-container v-if="item.product && products.filter(product => product.urlNumber === item.product)[0]" class="product">
            <v-img
              class="product-image"
              :aspect-ratio="6 / 9"
              :src="item.image"
              max-height="350"
            />
            <h3 class="product-name">
              {{ products.filter(product => product.urlNumber === item.product)[0].name }}
            </h3>
            <h3 class="product-price">
              R${{ products.filter(product => product.urlNumber === item.product)[0].variants.type === 'unique' ? $store.getters['products/getPrice']( products.filter(product => product.urlNumber === item.product)[0].variants).toFixed(2).replace('.', ',') : $store.getters['products/getPrice']( products.filter(product => product.urlNumber === item.product)[0].variants).max.toFixed(2) === $store.getters['products/getPrice']( products.filter(product => product.urlNumber === item.product)[0].variants).min.toFixed(2) ? `${$store.getters['products/getPrice']( products.filter(product => product.urlNumber === item.product)[0].variants).min.toFixed(2).replace('.', ',')}` : `${$store.getters['products/getPrice']( products.filter(product => product.urlNumber === item.product)[0].variants).min.toFixed(2).replace('.', ',')} - ${$store.getters['products/getPrice']( products.filter(product => product.urlNumber === item.product)[0].variants).max.toFixed(2).replace('.', ',')}` }}
            </h3>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
    <div :class="`d-flex flex-row flex-wrap ${section.items.length > 1 ? 'justify-space-around' : ''}`" />
  </div>
</template>

<script>
async function getData (Vue) {
  for (const item of Vue.section.items) {
    if (item.product) {
      try {
        const response = await Vue.$axios.$get(`/products/get?id=${item.product}`)
        Vue.$store.commit('products/addProduct', response.product)
      } catch (e) {
        Vue.$store.commit('setGlobalDialog', {
          title: 'Erro ao carregar conteúdo',
          content: 'Erro ao conectar no banco de dados.'
        })
      }
    }
  }
}
export default {
  props: {
    section: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      products: this.$store.state.products.products || []
    }
  },
  async fetch () {
    await getData(this)
  },
  async beforeMount () {
    if (this.products.length < 1) {
      await getData(this)
    }
  },
  methods: {
    goTo (id) {
      this.$router.push(`/produto/${id}`)
    }
  }
}
</script>

<style scoped>
.product {
  cursor: pointer;
}
.product-image {
  border-radius: 8px !important;
}
.product-name {
  color: #4ba12a;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 700;
}
.product-price {
  color: #2c7a9e;
  font-weight: 600;
}
</style>
