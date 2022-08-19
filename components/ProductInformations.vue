<template>
  <div>
    <v-row>
      <v-col cols="8">
        <le-column>
          <h2 class="font-weight-medium px-3">
            <template v-if="$store.getters['products/getSelectedPrice'](product.variants)">
              R${{ $store.getters['products/getSelectedPrice'](product.variants).toFixed(2).replaceAll('.', ',') }}
            </template>
            <template v-else>
              R${{ product.variants.type === 'unique' ? $store.getters['products/getPrice'](product.variants).toFixed(2).replace('.', ',') : $store.getters['products/getPrice'](product.variants).max.toFixed(2) === $store.getters['products/getPrice'](product.variants).min.toFixed(2) ? `${$store.getters['products/getPrice'](product.variants).min.toFixed(2).replace('.', ',')}` : `${$store.getters['products/getPrice'](product.variants).min.toFixed(2).replace('.', ',')} - ${$store.getters['products/getPrice'](product.variants).max.toFixed(2).replace('.', ',')}` }}
            </template>
          </h2>
          <div class="d-flex flex-row px-3">
            <v-icon>
              mdi-credit-card
            </v-icon>
            <div class="grey--text text--darken-1 font-weight-bold ml-1">
              <span v-if="$store.getters['products/getSelectedPrice'](product.variants)">
                6x de R${{ ($store.getters['products/getSelectedPrice'](product.variants)/6).toFixed(2).toString().replaceAll('.', ',') }} sem juros.
              </span>
              <span v-else>
                Em até 6x sem juros.
              </span>
            </div>
          </div>
        </le-column>
      </v-col>
      <v-col cols="4">
        <v-sheet class="d-flex flex-row justify-end">
          <v-btn v-clipboard:copy="`https://www.leechineo.com/produto/${product.urlNumber}`" v-clipboard:success="onShare" icon>
            <v-icon color="grey darken-2" size="32">
              mdi-share-variant
            </v-icon>
          </v-btn>
          <v-btn icon :loading="loading.favorites" @click="addToOrRemoveFromFavorite">
            <v-icon class="px-1 mr-1" :color="product.favorite ? 'red' : 'grey darken-2'" size="32">
              {{ product.favorite ? 'favorite' : 'favorite_border' }}
            </v-icon>
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row class="mb-6">
      <le-column>
        <v-sheet>
          <h2 class="font-weight-medium px-3">
            {{ product.name }}
          </h2>
        </v-sheet>
        <div v-if="product.rating" class="d-flex flex-row px-3">
          <v-rating
            :value="product.rating"
            half-increments
            dense
            readonly
            background-color="yellow darken-3"
            color="yellow darken-3"
          />
          <div class="ml-1">
            {{ product.rating.toFixed(1).replace('.', ',') }} | 10 pedidos
          </div>
        </div>
      </le-column>
    </v-row>
    <v-row class="mx-3">
      <v-icon>local_shipping</v-icon>
      <le-column class="mx-3">
        <p class="font-weight-bold mb-0">
          Frete grátis
        </p>
        <div>
          <v-btn text class="pa-0" color="primary">
            Calcular prazo de entrega
          </v-btn>
        </div>
      </le-column>
    </v-row>
    <v-row class="mt-6">
      <le-column>
        <ProductVariants :variants="product.variants" />
      </le-column>
    </v-row>
    <v-row class="desktop-item">
      <v-sheet class=" rounded-lg mx-3" width="100%" color="grey lighten-4">
        <v-btn
          tile
          class="rounded-tl-lg rounded-tr-lg"
          elevation="0"
          color="primary"
          block
          :disabled="$store.getters['products/disableBuyActions'](product)"
          @click="addToCart"
        >
          <v-icon>add_shopping_cart</v-icon>
        </v-btn>
        <v-btn
          color="blue darken-1"
          class="white--text rounded-bl-lg rounded-br-lg"
          tile
          elevation="0"
          block
          :disabled="$store.getters['products/disableBuyActions'](product)"
        >
          Comprar agora
        </v-btn>
      </v-sheet>
    </v-row>
    <v-snackbar v-model="shareSnackbar.show" :timeout="shareSnackbar.timeout" rounded="pill">
      <div class="text-center">
        {{ shareSnackbar.text }}
      </div>
    </v-snackbar>
    <v-dialog v-model="dialogs.loginNeeded" max-width="700">
      <v-card>
        <v-card-title>Você precisa entrar na sua conta</v-card-title>
        <v-card-text>Para realizar a ação você precisa entrar na sua conta.</v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="dialogs.loginNeeded = false">
            Cancelar
          </v-btn>
          <v-btn text color="primary" to="/login">
            Entrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: {
        favorites: false
      },
      shareSnackbar: {
        show: false,
        text: 'Link copiado para a área de transferência.',
        timeout: 2000
      },
      dialogs: {
        loginNeeded: false
      }
    }
  },
  computed: {
    isOnFavorites () {
      return this.$auth.user?.favorites?.includes(this.product.urlNumber) || false
    }
  },
  methods: {
    addToCart () {
      this.$emit('addToCart')
    },
    onShare () {
      this.shareSnackbar.show = true
    },
    async addToOrRemoveFromFavorite () {
      if (!this.$store.state.auth.loggedIn) {
        this.dialogs.loginNeeded = true
        return
      }
      try {
        this.loading.favorites = true
        await this.$axios.$put(`/user/favorites/update?id=${this.product.urlNumber}`)
        this.$store.commit('products/toggleFavorite', this.product.urlNumber)
        this.loading.favorites = false
      } catch (e) {
        this.loading.favorites = false
        this.$store.commit('setGlobalDialog', {
          title: 'Falha ao atualizar os favoritos.',
          content: e?.response?.data?.message || 'Erro interno do servidor, tente novamente mais tarde.',
          show: true
        })
      }
    }
  }
}
</script>

<style>

</style>
