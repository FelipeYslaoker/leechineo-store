<template>
  <div>
    <div v-if="!loading">
      <v-row align-content-md="center" justify-md="center">
        <v-col cols="12" md="6">
          <v-sheet color="grey lighten-3" class="rounded-lg cursor-pointer">
            <v-subheader>Escolher endereço</v-subheader>
            <le-address v-for="(address, n) in $store.state.address.items" :key="address.id" :address="address" :selected="$store.state.address.selected === n" :index="n" />
            <v-btn text block color="primary" @click="dialogs.addAddress = true">
              <v-icon>add</v-icon>
              <add-address v-model="dialogs.addAddress" />
            </v-btn>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="6">
          <v-sheet color="grey lighten-3" class="rounded-lg pa-3">
            <div class="d-flex justify-space-around">
              <v-sheet
                v-for="payMethod, n in paymentMethods.items"
                :key="n"
                width="100%"
                :class="`cursor-pointer rounded-lg px-2 py-2 mx-1 d-flex justify-center align-center unselectable ${paymentMethods.selected === n ? 'white--text background-transition' : ''}`"
                :color="paymentMethods.selected === n ? 'primary' : ''"
                @click="paymentMethods.selected = n"
              >
                <v-icon :color="paymentMethods.selected === n ? 'white' : ''">
                  {{ payMethod.icon }}
                </v-icon>
              </v-sheet>
            </div>
            <v-sheet class="rounded-lg my-3 pa-3">
              <span>Total: </span>
              <span v-show="paymentMethods.selected !== 0" class="text-decoration-line-through grey--text lighten-2">R$ {{ $store.getters['cart/totalPrice'] | toBRL }}</span>
              <span>R$ {{ finalPrice | toBRL }}</span>
            </v-sheet>
            <div>
              <v-sheet v-show="paymentMethods.selected === 0" class="rounded-lg px-4 py-1">
                <v-radio-group v-if="$store.state.creditCard.items.length" v-model="selectedCreditCard">
                  <v-sheet v-for="creditCard, index in $store.state.creditCard.items.filter(card => card.verified === true)" :key="creditCard.id" class="rounded-lg px-3 py-4 mb-2" :color="`${selectedCreditCard === index ? 'primary' : 'grey lighten-4'}`">
                    <v-radio :value="index" :color="`${selectedCreditCard === index ? 'white' : 'primary'}`">
                      <template #label>
                        <v-sheet width="100%" color="transparent" :class="`ml-3 ${selectedCreditCard === index ? 'white--text background-transition' : ''}`">
                          <div class="d-flex justify-space-between">
                            <span class="font-14"><strong>Nome: </strong>{{ creditCard.name }} ({{ creditCard.brand.name }})</span>
                          </div>
                          <span class="font-14"><strong>Final:</strong> {{ creditCard.lastDigits }}</span>
                        </v-sheet>
                      </template>
                    </v-radio>
                  </v-sheet>
                </v-radio-group>
                <v-sheet v-else class="d-flex flex-column justify-center align-center">
                  <p class="font-20 text-center font-weight-medium">
                    Nenhum cartão de crédito adicionado.
                  </p>
                </v-sheet>
                <v-btn text block color="primary" @click="dialogs.addCreditCard = true">
                  <v-icon>add_card</v-icon>
                </v-btn>
              </v-sheet>
              <add-credit-card v-model="dialogs.addCreditCard" />
              <v-sheet v-show="paymentMethods.selected === 1" class="pa-3 rounded-lg">
                <v-text-field v-model="slip.cpf" outlined dense label="CPF do Titular" />
                <v-text-field v-model="slip.holder" outlined dense label="Nome do Titular" />
              </v-sheet>
              <v-sheet v-if="paymentMethods.selected === 2" class="pa-3 rounded-lg d-flex justify-center">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-sheet color="grey lighten-3 rounded-lg" width="100%" height="200px" />
                  </v-col>
                  <v-col cols="12" md="6">
                    tutors
                  </v-col>
                </v-row>
              </v-sheet>
              <v-btn
                color="primary"
                class="not-uppercase mt-3"
                elevation="0"
                block
                :disabled="disableButton"
                @click="payment"
              >
                Finalizar Compra
              </v-btn>
            </div>
          </v-sheet>
        </v-col>
        <v-dialog v-model="dialogs.payment" fullscreen persistent>
          <v-card class="d-flex align-center justify-center">
            <v-sheet max-width="60%">
              <div v-if="!processingPayment">
                <div class="text-center">
                  <v-icon v-if="order.paymentData.status" size="60" color="green">
                    check_circle
                  </v-icon>
                  <v-icon v-if="paymentError.message" size="60" color="orange">
                    error
                  </v-icon>
                </div>
                <div v-if="paymentError.message" class="text-center">
                  <h1 class="font-25 text-center">
                    Erro ao processar o pagamento.
                  </h1>
                  <p class="text-center">
                    {{ paymentError.message }}
                  </p>
                  <v-btn color="red" text @click="dialogs.payment = false">
                    Fechar
                  </v-btn>
                </div>
                <p v-if="order.paymentData.status" class="text-center mt-3">
                  Seu pedido foi <strong>finalizado</strong> e está sendo processado.
                </p>
                <div class="d-flex justify-center flex-wrap align-center">
                  <v-btn v-if="order.paymentData.slipUrl" class="not-uppercase mt-2" color="primary" elevation="0" @click="goTo(order.paymentData.slipUrl)">
                    Baixar Boleto
                  </v-btn>
                  <v-btn v-if="!paymentError.message" to="/orders" class="not-uppercase ml-2 mt-2" elevation="0" color="primary">
                    Ver meus Pedidos
                  </v-btn>
                </div>
              </div>
              <div v-else>
                <div class="text-center">
                  <v-progress-circular color="primary" :width="7" :size="70" indeterminate />
                </div>
                <p class="mt-5">
                  <span class="font-weight-bold">Processando</span> pagamento...
                </p>
              </div>
            </v-sheet>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <div v-else />
    <v-dialog v-model="loading" persistent fullscreen>
      <v-card class="d-flex justify-center align-center flex-column">
        <le-wave />
        <p class="font-18 mt-5 font-weight-normal">
          Carregando dados da sua conta...
        </p>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      dialogs: {
        addAddress: false,
        payment: false,
        addCreditCard: false
      },
      processingPayment: false,
      selectedCreditCard: 0,
      paymentError: {
        message: ''
      },
      order: {
        paymentData: {},
        address: {},
        items: [],
        finalPrice: 0
      },
      slip: {
        cpf: this.$store?.state?.auth?.user?.cpf || '',
        holder: `${this?.$store?.state?.auth?.user?.name || ''} ${this?.$store?.state?.auth?.user?.surname || ''}` || ''
      },
      paymentMethods: {
        selected: 0,
        items: [
          {
            title: 'Cartão de Crédito',
            icon: 'credit_card',
            id: 'creditCard'
          },
          {
            title: 'Boleto',
            icon: 'mdi-barcode-scan',
            id: 'slip'
          },
          {
            title: 'Pix',
            icon: 'pix',
            id: 'pix'
          }
        ]
      }
    }
  },
  async fetch () {
    await this.loadData()
  },
  computed: {
    disableButton () {
      if (!this.$store.state.address.items.length) {
        return true
      }
      if (this.paymentMethods.selected === 0) {
        return !this.$store.state.creditCard.items.length
      } else if (this.paymentMethods.selected === 1) {
        return this.slip.cpf.length < 14 || this.slip.holder.length < 2
      } else {
        return true
      }
    },
    finalPrice () {
      const totalPrice = this.$store.getters['cart/totalPrice']
      let finalDiscount
      switch (this.paymentMethods.selected) {
        case 0 :
          finalDiscount = 0
          break
        case 1 :
          finalDiscount = totalPrice * 3 / 100
          break
        case 2 :
          finalDiscount = totalPrice * 5 / 100
          break
      }
      return (totalPrice - finalDiscount)
    }
  },
  async mounted () {
    this.loading = true
    await this.$updateCart()
    if (this.$store.state.cart.items.length < 1) {
      return this.$router.push('/')
    }
    await this.loadData()
    this.loading = false
  },
  methods: {
    goTo () {
      window.open(this.order.paymentData.slipUrl)
    },
    async payment () {
      this.processingPayment = true
      this.dialogs.payment = true
      const addressState = this.$store.state.address
      try {
        const paymentData = await this.$axios.$post('/payment/pay', {
          method: this.paymentMethods.items[this.paymentMethods.selected].id,
          address: addressState.items[addressState.selected]._id,
          slip: this.slip,
          'credit-card': this.$store.state.creditCard.items[this.selectedCreditCard]?.id
        })
        await this.$updateCart()
        this.order = paymentData
        this.paymentError.message = ''
        this.processingPayment = false
      } catch (e) {
        this.processingPayment = false
        this.paymentError.message = e.response.data.message
      }
    },
    async loadData () {
      const addresses = this.$store.state.address.items
      const creditCards = this.$store.state.creditCard.items
      if (!creditCards?.length) {
        const _creditCards = await this.$axios.$get('/user/credit-card/get')
        if (_creditCards.length) {
          this.$store.commit('creditCard/setCards', _creditCards)
        }
      }
      if (!addresses?.length) {
        const _addresses = await this.$axios.$get('/user/address/get')
        if (!_addresses.length) {
          return
        }
        for (const address of _addresses) {
          this.$store.commit('address/addAddress', address)
        }
        this.$store.commit('address/setSelected', _addresses.selected || 0)
      }
    }
  }
}
</script>

<style>
</style>
