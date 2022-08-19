<template>
  <div>
    <div v-if="!loading">
      <div v-if="items.length > 0">
        <v-row>
          <v-col v-for="item in items" :key="item.id" cols="12" md="6" lg="3">
            <v-sheet color="grey lighten-4" class="d-flex pa-3 rounded-lg align-center" height="200px">
              <v-sheet color="transparent">
                <v-img
                  :src="item.product.image"
                  width="60px"
                  class="rounded-lg mr-2"
                />
              </v-sheet>
              <v-sheet class="d-flex flex-column" color="transparent">
                <span class="font-weight-bold text-truncate">{{ item.product.name }}</span>
                <span class="font-weight-light text-truncate" style="max-width: 200px;">{{ item.quantity }}x {{ item.variant.join(" ") }}</span>
                <span v-if="item.price.final" class="text-decoration-line-through grey--text lighten-3--text font-weight-bold">R$ {{ item.price.base * item.quantity | toBRL }}</span>
                <span class="font-weight-bold">R$ {{ item.price.final * item.quantity || item.price.base * item.quantity | toBRL }}</span>
                <v-chip-group>
                  <v-chip v-show="item.tickets.length > 0" color="red" class="white--text">
                    {{ item.tickets.length }} {{ item.tickets.length === 1 ? 'cupom' : 'cupons' }}
                  </v-chip>
                  <v-chip color="green" class="white--text">
                    <!-- {{ item.shippingMethod.name }} //TODO Mostrar o nome do frete | Show shipping method name-->
                    Frete grátis
                  </v-chip>
                </v-chip-group>
                <v-sheet color="transparent">
                  <v-btn small class="not-uppercase" rounded color="primary" elevation="0">
                    Editar
                  </v-btn>
                  <v-btn icon color="red">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-sheet>
              </v-sheet>
            </v-sheet>
          </v-col>
        </v-row>
        <v-sheet height="70px" />
        <v-sheet
          width="100%"
          color="primary"
          class="cart-bottom-navigation pa-3"
        >
          <div class="d-flex justify-space-between align-center">
            <span class="white--text">Total: <strong class="font-20">R$ {{ totalPrice | toBRL }}</strong></span>
            <v-btn rounded color="white" elevation="0" to="/checkout">
              Continuar
            </v-btn>
          </div>
        </v-sheet>
      </div>
      <div v-else>
        <v-sheet width="100%" class="d-flex justify-center align-center py-10 flex-column">
          <v-img width="80%" max-width="500px" src="/assets/images/undraw-empty-cart.svg" />
          <h1 class="font-25 my-5">
            Seu carrinho está vazio!
          </h1>
          <v-btn elevation="0" color="primary" class="not-uppercase" to="/">
            Comece a Comprar
          </v-btn>
        </v-sheet>
      </div>
    </div>
    <div v-else />
    <v-dialog v-model="loading" persistent fullscreen>
      <v-card class="d-flex justify-center align-center flex-column">
        <le-wave />
        <p class="font-18 mt-5 font-weight-normal">
          Carregando dados do carrinho...
        </p>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: 'onlyAuthedUser',
  data () {
    return {
      loading: true,
      items: []
    }
  },
  computed: {
    totalPrice () {
      return this.$store.getters['cart/totalPrice']
    }
  },
  async mounted () {
    try {
      this.loading = true
      await this.$updateCart()
      this.items = this.$store.state.cart.items
      this.loading = false
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }
}
</script>

<style scoped>
.cart-bottom-navigation {
  position: fixed;
  height: 65px;
  left: 0px;
  bottom: 0px;
}
</style>
