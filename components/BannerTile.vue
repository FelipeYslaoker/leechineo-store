<template>
  <div>
    <v-window v-model="onboarding" class="ma-2">
      <v-window-item
        v-for="(item, i) in section.items"
        :key="`item-${i}`"
        @click="products.filter(product => product.urlNumber === item.product)[0] ? $router.push(`/produto/${products.filter(product => product.urlNumber === item.product)[0].urlNumber}`) : null"
      >
        <v-img :src="item.image" width="100%" alt="Banner" class="rounded-lg" />
      </v-window-item>
    </v-window>
    <v-row v-show="section.items.length > 1" class="justify-center bottom ma-2">
      <v-item-group
        v-model="onboarding"
        class="text-center"
        mandatory
      >
        <v-item
          v-for="(item, i) in section.items"
          :key="`btn-${i}`"
          v-slot="{ active, toggle }"
        >
          <v-btn
            :input-value="active"
            icon
            @click="toggle"
          >
            <v-icon>remove</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
    </v-row>
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
          content: 'Falha ao conectar no banco de dados.'
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
      onboarding: 0,
      products: this.$store.state.products.products || [],
      windowWidth: 0
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
  created () {

  },
  methods: {
    next () {
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1
    },
    prev () {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1
    }
  }
}
</script>

<style scoped>
.bottom {
  position: relative;
  bottom: 0px;
}
</style>
