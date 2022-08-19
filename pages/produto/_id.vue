<template>
  <div>
    <div v-if="product.name">
      <div>
        <v-row>
          <v-col cols="12" md="10">
            <le-column>
              <v-row>
                <v-col v-show="product.images.length > 0" cols="12" md="4">
                  <product-caroulsel :product="product" />
                </v-col>
                <v-col cols="12" :md="product.images.length > 0 ? '8' : '12'">
                  <product-informations :product="product" @addToCart="dialogs.addToCart = true" />
                </v-col>
              </v-row>
              <le-column class="mobile-item">
                <v-btn
                  v-if="product.description"
                  block
                  class="my-2"
                  rounded
                  elevation="0"
                  color="primary"
                  @click="dialogs.description = true"
                >
                  Descrição
                </v-btn>
                <v-btn
                  v-if="product.specifications.length > 0"
                  block
                  class="my-2"
                  rounded
                  elevation="0"
                  color="primary"
                  @click="dialogs.specifications = true"
                >
                  Especificações
                </v-btn>
                <v-btn
                  block
                  class="my-2"
                  rounded
                  elevation="0"
                  color="primary"
                  @click="dialogs.ratings = true"
                >
                  Avaliações
                </v-btn>
              </le-column>
              <v-tabs
                class="desktop-item mt-3"
                color="primary"
              >
                <v-tab v-if="product.description">
                  Descrição
                </v-tab>
                <v-tab v-if="product.specifications.length > 0">
                  Especificações
                </v-tab>
                <v-tab>Avaliações</v-tab>
                <v-tab-item v-if="product.description">
                  <product-description :product="product" />
                </v-tab-item>
                <v-tab-item v-if="product.specifications.length > 0">
                  <product-specs :product="product" />
                </v-tab-item>
                <v-tab-item>
                  <product-ratings :product="product" />
                </v-tab-item>
              </v-tabs>
            </le-column>
          </v-col>
          <v-col cols="12" md="2">
            <div class="text-overline font-weight-light text-center my-2 my-md-0">
              Novidades
            </div>
            <product-news />
          </v-col>
        </v-row>
      </div>
      <v-dialog v-model="dialogs.description" fullscreen transition="dialog-bottom-transition" hide-overlay>
        <v-card>
          <v-toolbar
            dark
            elevation="0"
            prominent
            :src="product.images[0]"
          >
            <v-btn
              icon
              dark
              @click="dialogs.description = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Descrição</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <product-description :product="product" />
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogs.specifications" fullscreen transition="dialog-bottom-transition" hide-overlay>
        <v-card>
          <v-toolbar
            dark
            elevation="0"
            prominent
            :src="product.images[0]"
          >
            <v-btn
              icon
              dark
              @click="dialogs.specifications = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Especificações</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <product-specs :product="product" />
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogs.ratings" fullscreen transition="dialog-bottom-transition" hide-overlay>
        <v-card>
          <v-toolbar
            dark
            elevation="0"
            prominent
            :src="product.images[0]"
          >
            <v-btn
              icon
              dark
              @click="dialogs.ratings = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Avaliações</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <product-ratings :product="product" />
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-sheet class="product-bottom-navigation pa-3 mobile-item" width="100%" color="primary" dark>
        <v-btn icon color="white" to="/">
          <v-icon>home</v-icon>
        </v-btn>
        <v-btn icon color="white" dark>
          <v-icon>chat</v-icon>
        </v-btn>
        <v-btn icon color="white" :disabled="$store.getters['products/disableBuyActions'](product)" dark @click="dialogs.addToCart = true">
          <v-icon>add_shopping_cart</v-icon>
        </v-btn>
        <v-btn
          rounded
          color="white"
          elevation="0"
          :disabled="$store.getters['products/disableBuyActions'](product)"
          dark
          class="primary--text"
        >
          Comprar agora
        </v-btn>
      </v-sheet>
    </div>
    <v-dialog v-model="dialogs.addToCart" persistent fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="white" flat>
          <v-btn icon @click="dialogs.addToCart = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{ product.name }}
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn color="primary" text @click="addToCart">
              Adicionar
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-sheet class="d-flex justify-space-around flex-wrap">
          <!-- <v-col cols="11" md="5">
            <h3 class="ml-3">
              Calcular Frete e Prazo
            </h3>
            <v-text-field
              v-model="cep"
              v-mask="'#####-###'"
              outlined
              dense
              class="mt-3"
              label="CEP*"
              @focus="elements.addCartBottomOptions = false"
              @focusout="elements.addCartBottomOptions = true"
            />
            <v-btn elevation="0" color="primary" block :disabled="cep.length !== 9" @click="calculateShipping">
              Calcular
            </v-btn>

            <v-sheet v-if="shipping" color="green" class="d-flex align-center white--text rounded-lg pa-2 mt-2">
              <v-icon class="mx-3" color="white">
                local_shipping
              </v-icon>
              <div class="mx-3">
                <div class="font-weight-bold text-h6">
                  {{ shipping.name }}
                </div>
                <div>
                  {{ shipping.mapping.value === 0 ? 'Frete Grátis' : `Valor do envio: R$${shipping.mapping.value.toFixed(2).replace('.', ',')}` }}
                </div>
                <div class="font-weight-light">
                  Chegará entre {{ shippingTime.min }} e {{ shippingTime.max }}
                </div>
              </div>
            </v-sheet>
          </v-col> -->
          <v-col cols="11">
            <h3 class="ml-3">
              Desconto
            </h3>
            <v-text-field
              v-model="ticket"
              outlined
              dense
              class="mt-3"
              label="Cupom"
              @focus="elements.addCartBottomOptions = false"
              @focusout="elements.addCartBottomOptions = true"
            />
            <v-btn elevation="0" color="primary" block :disabled="ticket.length < 1" @click="applyTicket">
              Aplicar
            </v-btn>
            <v-sheet class="mt-3 d-flex flex-wrap">
              <ticket v-for="ticket, i in tickets" :key="i" class="ma-2" :ticket="ticket" />
            </v-sheet>
          </v-col>
          <v-sheet v-show="elements.addCartBottomOptions" width="90%" class="pb-3 add-to-cart-action">
            <v-row>
              <v-col cols="12" md="6">
                <v-sheet class="d-flex align-center" color="white" height="60px">
                  <h3 class="ml-3">
                    Quantidade
                  </h3>
                  <v-subheader>
                    {{ quantity }}/{{ $store.getters['products/getVariantQuantity'](product.variants) }}
                  </v-subheader>
                  <v-btn icon :disabled="quantity <= 1" @click="quantity--">
                    <v-icon>remove</v-icon>
                  </v-btn>
                  <v-slider
                    v-model="quantity"
                    class="mx-3 mt-4 black--text"
                    :max="$store.getters['products/getVariantQuantity'](product.variants)"
                    min="1"
                    thumb-label
                  />
                  <v-btn icon :disabled="quantity >= $store.getters['products/getVariantQuantity'](product.variants)" @click="quantity++">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-sheet>
              </v-col>
              <v-col cols="12" md="6" class="text-h6 text-md-h5">
                <v-sheet v-if="price.original" class="d-flex align-center justify-center">
                  <span class="mr-2 font-weight-bold">Total:</span>
                  <span :class="`${price.discounted ? 'text-decoration-line-through grey--text lighten-2' : ''}`">
                    R${{ price.original.toFixed(2).replaceAll('.', ',') }}
                  </span>
                  <span v-if="price.discounted" class="ml-2">
                    R${{ price.discounted.toFixed(2).replaceAll('.', ',') }}
                  </span>
                </v-sheet>
              </v-col>
            </v-row>
          </v-sheet>
        </v-sheet>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogs.addedToCart" max-width="700">
      <v-card>
        <v-card-title>Sucesso!</v-card-title>
        <v-card-text>O produto adicionado ao carrinho com sucesso.</v-card-text>
        <v-card-actions>
          <v-btn text color="primary" @click="dialogs.addedToCart = false">
            Ok
          </v-btn>
          <v-btn text color="green" to="/cart">
            Ir para o carrinho
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
async function getData (Vue) {
  if (Vue.$store.state.products.products.filter(product => product.urlNumber === Number(Vue.$route.params.id))[0]) {
    Vue.product = Vue.$store.state.products.products.filter(product => product.urlNumber === Number(Vue.$route.params.id))[0]
  } else {
    try {
      const response = await Vue.$axios(`/products/get?id=${Vue.$route.params.id}`)
      Vue.product = { ...response.data.product, rating: 4.3 }
      Vue.$store.commit('products/addProduct', Vue.product)
    } catch (e) {
      console.log(Vue.$nuxt)
      Vue.$nuxt.error({ statusCode: e.response?.status || 500 })
    }
  }
}
export default {
  data () {
    return {
      shipping: undefined,
      html: '',
      elements: {
        addCartBottomOptions: true
      },
      dialogs: {
        description: false,
        specifications: false,
        ratings: false,
        addToCart: false,
        addedToCart: false
      },
      product: {},
      quantity: 1,
      ticket: '',
      cep: '',
      tickets: []
    }
  },
  async fetch () {
    await getData(this)
  },
  head () {
    if (this.product.name) {
      return {
        title: this.product.name,
        meta: [
          { name: 'description', content: this.product.description.replace(/<[^>]*>?/gm, '') },
          { name: 'keywords', content: `${this.product.name} ${this.product.description.replace(/<[^>]*>?/gm, '')}` },
          { property: 'og:title', content: this.product.name },
          { property: 'og:description', content: this.product.description.replace(/<[^>]*>?/gm, '') },
          { property: 'og:image', content: this.product.images[0] },
          { property: 'og:locale', content: 'pt-br' },
          { property: 'og:site_name', content: 'Leechineo' }
        ]
      }
    } else {
      return {}
    }
  },
  computed: {
    shippingTime () {
      const minDay = new Date(new Date().setDate(25)).getDate()
      const maxDay = new Date(new Date().setDate(35)).getDate()
      const minMonth = new Date(new Date().setDate(25)).getMonth()
      const maxMonth = new Date(new Date().setDate(35)).getMonth()
      return {
        min: `${minDay.toString().padStart(2, '0')} de ${this.getMonthName(minMonth)}`,
        max: `${maxDay.toString().padStart(2, '0')} de ${this.getMonthName(maxMonth)}`
      }
    },
    price () {
      const price = {
        original: (this.$store.getters['products/getSelectedPrice'](this.product.variants) * this.quantity) + (this.shipping?.mapping?.value || 0)
      }
      if (this.tickets.length > 0) {
        const discounts = this.tickets.map((ticket) => {
          if (ticket.discount.type === 'currency') {
            return ticket.discount.value
          } else {
            return price.original * Number(ticket.discount.value) / 100
          }
        })
        const discountValue = discounts.reduce((previous, current) => previous + current)
        price.discounted = price.original - discountValue
      }
      return price
    }
  },
  async beforeMount () {
    if (!this.$store.state.products.products.filter(product => product.urlNumber === Number(this.$route.params.id))[0]) {
      await getData(this)
    }
  },
  methods: {
    async calculateShipping () {
      this.$nuxt.$loading.start()
      try {
        const shipping = (await this.$axios.post('/shipping/calculate', {
          product: {
            id: this.$route.params.id,
            variant: this.$store.state.products.selectedVariant
          },
          zipcode: this.cep.replace('-', '')
        })).data
        this.shipping = shipping
        this.$nuxt.$loading.finish()
        this.$store.commit('setGlobalDialog', {
          title: shipping.name,
          content: `O envio ${shipping.name} está disponível e já foi aplicado :D`,
          show: true
        })
      } catch (e) {
        this.$nuxt.$loading.finish()
        this.$store.commit('setGlobalDialog', {
          title: 'Erro ao calcular o frete',
          content: e.response?.data?.message || 'Erro interno do servidor, tente novamente mais tarde.',
          show: true
        })
      }
    },
    getMonthName (month) {
      switch (month) {
        case 0 :
          return 'Janeiro'
        case 1 :
          return 'Fevereiro'
        case 2 :
          return 'Março'
        case 3 :
          return 'Abril'
        case 4 :
          return 'Maio'
        case 5 :
          return 'Junho'
        case 6 :
          return 'Julho'
        case 7 :
          return 'Agosto'
        case 8 :
          return 'Setembro'
        case 9 :
          return 'Outubro'
        case 10 :
          return 'Novembro'
        case 11 :
          return 'Dezembro'
      }
    },
    async addToCart () {
      try {
        this.$nuxt.$loading.start()
        await this.$axios.$post('/user/cart/add', {
          product: this.$nuxt.$route.params.id,
          variant: this.$store.state.products.selectedVariant,
          quantity: this.quantity,
          tickets: this.tickets?.map(ticket => ticket.name) || undefined,
          zipcode: this.cep
        })
        this.dialogs.addToCart = false
        this.tickets = []
        this.cep = ''
        this.shipping = undefined
        this.ticket = ''
        this.quantity = 1
        this.dialogs.addedToCart = true
        this.$store.commit('cart/setLoaded')
        this.$nuxt.$loading.finish()
      } catch (e) {
        this.$nuxt.$loading.finish()
        this.$store.commit('setGlobalDialog', {
          title: 'Não foi possível adicionar o produto ao carrinho.',
          content: e.response?.data?.message || 'Erro interno do servidor, tente novamente mais tarde.',
          show: true
        })
      }
    },
    async applyTicket () {
      this.$nuxt.$loading.start()
      try {
        if (this.tickets.filter(ticket => ticket.name.toUpperCase() === this.ticket.toUpperCase()).length > 0) {
          this.$nuxt.$loading.finish()
          return this.$store.commit('setGlobalDialog', {
            title: 'Não pode repetir!',
            content: 'O cupom não foi aplicado pois o mesmo já foi aplicado antes.',
            show: true
          })
        }
        const response = await this.$axios(`/ticket/verify?name=${this.ticket.toUpperCase()}&type=product&productID=${this.$route.params.id}`)
        const discountTicket = (await this.$axios.$get(`ticket/get?id=${response.data.ticket}`))?.ticket
        this.tickets.push(discountTicket)
        this.$nuxt.$loading.finish()
        this.$store.commit('setGlobalDialog', {
          title: `${this.ticket.toUpperCase()} :D!`,
          content: `O cumpom ${this.ticket.toUpperCase()} foi aplicado com sucesso.`,
          show: true
        })
      } catch (e) {
        this.$nuxt.$loading.finish()
        this.$store.commit('setGlobalDialog', {
          title: 'Não foi possível aplicar o cupom',
          content: e?.response?.data?.message || 'Erro interno do servidor, tente novamente mais tarde.',
          show: true
        })
      }
    }
  }
}
</script>

<style>
.add-to-cart-action {
  position: absolute;
  bottom: 0px;
  left: 0px;
}
@media (max-width: 905px){
  .product-bottom-navigation  {
      display: flex !important;
      position: fixed;
      bottom: 0px;
      left: 0px;
      justify-content: space-around;
  }
}
@media (min-width: 906px){
    .product-bottom-navigation  {
        display: none !important;
    }
}
</style>
