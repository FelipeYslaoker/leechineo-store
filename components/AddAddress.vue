<template>
  <v-dialog v-model="show" max-width="700px">
    <v-card>
      <v-card-title>Adicionar endereço</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="address.zipcode"
          v-mask="'#####-###'"
          outlined
          dense
          label="CEP*"
          :readonly="zipcodeSubmited"
          @keydown.enter="searchByZipcode"
        />
        <template v-if="zipcodeSubmited">
          <v-text-field :value="`${address.city}-${address.state}`" outlined dense readonly />
          <v-row dense>
            <v-col>
              <v-text-field v-model="address.street" label="Rua/Logradouro*" outlined dense />
            </v-col>
            <v-col>
              <v-text-field v-model="address.number" label="Número*" outlined dense type="number" />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col>
              <v-text-field v-model="address.district" label="Bairro*" outlined dense />
            </v-col>
            <v-col>
              <v-text-field v-model="address.complement" label="Complemento/Referência" outlined dense />
            </v-col>
          </v-row>
          <v-divider />
          <v-text-field
            v-model="address.phone"
            v-mask="'(##) #####-####'"
            label="Telefone*"
            prefix="+55"
            outlined
            dense
          />
          <v-btn
            color="primary"
            class="not-uppercase"
            text
            :disabled="disableSaveButton"
            block
            @click="saveAddress"
          >
            Salvar
          </v-btn>
        </template>
        <v-btn
          v-if="!zipcodeSubmited"
          class="not-uppercase"
          text
          block
          color="primary"
          :disabled="address.zipcode.length < 9"
          @click="searchByZipcode"
        >
          Buscar
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      zipcodeSubmited: false,
      show: this.value,
      address: {
        zipcode: '',
        city: '',
        state: '',
        district: '',
        street: '',
        number: '',
        complement: '',
        phone: ''
      }
    }
  },
  computed: {
    disableSaveButton () {
      return !(this.address.zipcode.trim() && this.address.city.trim() && this.address.state.trim() && this.address.district.trim() && this.address.street.trim() && this.address.number.trim() && this.address.phone.trim())
    }
  },
  watch: {
    value () {
      this.show = this.value
    },
    show () {
      this.$emit('input', this.show)
    }
  },
  methods: {
    async saveAddress () {
      this.$nuxt.$loading.start()
      try {
        const address = await this.$axios.$post('/user/address/add', this.address)
        this.$store.commit('address/addAddress', address)
        this.$nuxt.$loading.finish()
        this.address = {
          zipcode: '',
          city: '',
          state: '',
          district: '',
          street: '',
          number: '',
          complement: '',
          phone: ''
        }
        this.show = false
        this.zipcodeSubmited = false
      } catch (e) {
        this.$nuxt.$loading.finish()
        this.$store.commit('setGlobalDialog', {
          title: 'Falha ao salvar endereço.',
          content: e?.response?.data?.message || 'Erro interno do servidor, tente novamente mais tarde.',
          show: true
        })
      }
    },
    async searchByZipcode () {
      if (this.address.zipcode.length < 9) {
        return
      }
      this.$nuxt.$loading.start()
      try {
        const address = await this.$axios.$get(`/shipping/search-by-zipcode?zipcode=${this.address.zipcode}`)
        this.address.city = address.city || ''
        this.address.state = address.state || ''
        this.address.district = address.district || ''
        this.zipcodeSubmited = true
        this.$nuxt.$loading.finish()
      } catch (e) {
        this.$nuxt.$loading.finish()
        this.$store.commit('setGlobalDialog', {
          title: 'Falha ao buscar o CEP.',
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
