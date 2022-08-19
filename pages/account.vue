<template>
  <div>
    <v-sheet class="mb-5">
      <v-sheet class="d-flex align-center pa-3 justify-center">
        <v-avatar color="primary" size="60">
          <span class="white--text font-20 font-weight-bold">
            {{ initials }}
          </span>
        </v-avatar>
        <h1 class="font-20 ml-3">
          {{ user.name }} {{ user.surname }}
        </h1>
        <v-btn color="primary" text icon class="ml-3">
          <v-icon>
            edit
          </v-icon>
        </v-btn>
      </v-sheet>
    </v-sheet>
    <v-row dense>
      <v-col cols="12" md="6">
        <v-sheet color="grey lighten-3" class="rounded-t-lg pa-3">
          <h1 class="font-20">
            Endereços
          </h1>
        </v-sheet>
        <v-sheet class="mb-3 d-flex justify-center rounded-b-lg py-4" color="grey lighten-4">
          <le-wave v-if="loading.addresses" />
          <v-sheet v-else width="100%" color="transparent" class="px-3">
            <div v-for="address, index in $store.state.address.items" :key="address.id || address._id">
              <le-address :address="address" :selected="false" :index="index" />
              <v-row dense class="px-2">
                <v-col cols="12">
                  <v-btn block color="red" class="rounded-lg mb-3" elevation="0" @click="showDeleteDialog('address', address)">
                    <v-icon color="white">
                      delete
                    </v-icon>
                  </v-btn>
                </v-col>
                <!-- <v-col cols="6">
                  <v-btn block color="primary" class="rounded-lg" elevation="0">
                    <v-icon>
                      edit
                    </v-icon>
                  </v-btn>
                </v-col> -->
              </v-row>
            </div>
            <v-btn text color="primary" block @click="dialogs.addAddress = true">
              <v-icon>
                add_location_alt
              </v-icon>
            </v-btn>
          </v-sheet>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="6">
        <v-sheet color="grey lighten-3" class="rounded-t-lg pa-3">
          <h1 class="font-20">
            Métodos de pagamento
          </h1>
        </v-sheet>
        <v-sheet class="mb-3 d-flex justify-center rounded-b-lg py-4" color="grey lighten-4">
          <le-wave v-if="loading.creditCards" />
          <v-sheet v-else width="100%" class="px-5" color="transparent">
            <div v-for="card in $store.state.creditCard.items" :key="card.id">
              <v-sheet color="white" class="rounded-lg my-1 pa-2">
                <div>
                  <strong>Nome:</strong> {{ card.name }} ({{ card.brand.name }})
                </div>
                <div>
                  <strong>Final:</strong> {{ card.lastDigits }}
                </div>
                <div>
                  <strong>Verificado:</strong> {{ card.verified ? 'Sim' : 'Não' }}
                </div>
              </v-sheet>
              <v-btn color="red" class="rounded-lg mb-5 mt-3" elevation="0" block @click="showDeleteDialog('creditCard', card)">
                <v-icon color="white">
                  delete
                </v-icon>
              </v-btn>
            </div>
            <v-btn block color="primary" text @click="dialogs.addCard = true">
              <v-icon>
                add_card
              </v-icon>
            </v-btn>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
    <add-credit-card v-model="dialogs.addCard" />
    <add-address v-model="dialogs.addAddress" />
    <v-dialog v-model="dialogs.deleteAddress.show" max-width="500">
      <v-card>
        <v-card-title>Deseja apagar o endereço?</v-card-title>
        <le-address :address="dialogs.deleteAddress.addressToBeDeleted" :selected="true" :index="1" />
        <v-card-actions>
          <v-btn color="primary" class="not-uppercase" text @click="dialogs.deleteAddress.show = false">
            Cancelar
          </v-btn>
          <v-btn color="red" class="rounded-lg white--text not-uppercase" elevation="0" @click="deleteAddress">
            Deletar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogs.deleteCreditCard.show" max-width="500">
      <v-card>
        <v-card-title>Deseja apagar o cartão de crédito?</v-card-title>
        <v-card-text>
          <div>Cartão de crédito: {{ dialogs.deleteCreditCard.creditCardToBeDeleted.name }} ({{ dialogs.deleteCreditCard.creditCardToBeDeleted.brand.name }})</div>
          <div>Final: {{ dialogs.deleteCreditCard.creditCardToBeDeleted.lastDigits }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" class="not-uppercase" text @click="dialogs.deleteCreditCard.show = false">
            Cancelar
          </v-btn>
          <v-btn color="red" class="rounded-lg white--text not-uppercase" elevation="0" @click="deleteCreditCard">
            Deletar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: 'onlyAuthedUser',
  data () {
    return {
      user: this.$store.state.auth.user,
      addresses: this.$store.state.address.items,
      loading: {
        addresses: true,
        creditCards: true
      },
      dialogs: {
        addAddress: false,
        addCard: false,
        deleteAddress: {
          show: false,
          addressToBeDeleted: {}
        },
        deleteCreditCard: {
          show: false,
          creditCardToBeDeleted: {
            brand: {}
          }
        }
      }
    }
  },
  computed: {
    initials () {
      return `${this.user?.name[0]}${this.user?.surname[0]}`
    }
  },
  async mounted () {
    try {
      await this.loadData()
    } catch (e) {
      this.$pushError('Não foi possível carregar os dados.')
      this.loading.creditCards = false
      this.loading.addresses = false
    }
  },
  methods: {
    showDeleteDialog (dialog, document) {
      if (dialog === 'address') {
        this.dialogs.deleteAddress.show = true
        this.dialogs.deleteAddress.addressToBeDeleted = document
      } else {
        this.dialogs.deleteCreditCard.show = true
        this.dialogs.deleteCreditCard.creditCardToBeDeleted = document
      }
    },
    async deleteCreditCard () {
      this.$nuxt.$loading.start()
      try {
        await this.$axios.$delete('/user/credit-card/delete?id=' + this.dialogs.deleteCreditCard.creditCardToBeDeleted.id)
        this.$store.commit('creditCard/deleteItem', this.dialogs.deleteCreditCard.creditCardToBeDeleted.id)
        this.dialogs.deleteCreditCard.show = false
      } catch (e) {
        this.$pushError('Falha ao deletar cartão de crédito', e)
      }
      this.$nuxt.$loading.finish()
    },
    async deleteAddress () {
      this.$nuxt.$loading.start()
      try {
        await this.$axios.$delete('/user/address/delete?id=' + this.dialogs.deleteAddress.addressToBeDeleted._id)
        this.$store.commit('address/deleteItem', this.dialogs.deleteAddress.addressToBeDeleted._id)
        this.dialogs.deleteAddress.show = false
      } catch (e) {
        this.$pushError('Falha ao deletar endereço', e)
      }
      this.$nuxt.$loading.finish()
    },
    async loadData () {
      this.loading.creditCards = true
      this.loading.addresses = true
      const addresses = this.$store.state.address.items
      const creditCards = this.$store.state.creditCard.items
      if (!creditCards?.length) {
        const _creditCards = await this.$axios.$get('/user/credit-card/get')
        if (_creditCards.length) {
          this.$store.commit('creditCard/setCards', _creditCards)
          this.loading.creditCards = false
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
        this.loading.addresses = false
        this.$store.commit('address/setSelected', _addresses.selected || 0)
      }
    }
  }
}
</script>

<style>

</style>
