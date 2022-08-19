<template>
  <div>
    <v-dialog v-model="show" max-width="600px" persistent>
      <v-card>
        <v-sheet v-if="showLoading" color="rgba(255, 255, 255, .5)" :class="`position-absolute z-index-1 d-flex justify-center align-center blur-3 ${loading ? 'show-element' : 'hide-element'}`" width="100%" height="100%">
          <le-wave />
        </v-sheet>
        <v-stepper
          v-model="step"
        >
          <v-stepper-items>
            <v-stepper-content step="1">
              <h1 class="font-20 mb-3">
                Adicionar cartão: Passo 1 de 3
              </h1>
              <v-text-field
                v-model="creditCard.name"
                outlined
                dense
                :label="namePlaceHolder"
                placeholder="Ex: Nubank do Felipe"
                @focus="namePlaceHolder = 'Apelido para o cartão'"
              />
              <v-text-field
                v-model="creditCard.number"
                v-mask="'#### #### #### ####'"
                outlined
                dense
                label="Número do cartão"
                placeholder="5432 4321 3210 2100"
              />
              <v-text-field
                v-model="creditCard.holder"
                outlined
                dense
                label="Titular do cartão"
              />
              <v-text-field
                v-model="creditCard.dueDate"
                v-mask="'##/##'"
                outlined
                dense
                label="Validade"
                placeholder="05/25"
              />
              <v-row dense>
                <v-col cols="6">
                  <v-btn color="primary" class="not-uppercase" block :disabled="disableStepButton" @click="addCreditCard">
                    Continuar
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn color="red" class="not-uppercase" text block @click="show = false">
                    Cancelar
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="2">
              <h1 class="font-20 mb-3">
                Passo 2 de 3
              </h1>
              <p class="text-center font-18">
                Para <strong>fins de segurança</strong>, será efetuado uma pequena cobrança em um valor aleatório entre <strong>R$1,00</strong> e <strong>R$5,00</strong> em seu cartão, logo em seguida você deverá informar o valor cobrado para confirmação. O valor será estornado em seguida.
              </p>
              <v-text-field
                v-model="creditCard.securityCode"
                outlined
                dense
                label="Código de segurança do cartão"
                placeholder="234"
              />
              <v-row dense>
                <v-col cols="6">
                  <v-btn
                    color="primary"
                    class="not-uppercase"
                    block
                    :disabled="disableStepButton"
                    @click="charge"
                  >
                    Continuar
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn color="red" class="not-uppercase" text block @click="cancel">
                    Cancelar
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
            <v-stepper-content step="3">
              <h1 class="font-20 mb-3">
                Passo 3 de 3
              </h1>
              <p>Agora informe o valor cobrado no cartão :)</p>
              <v-text-field
                v-model="chargeValue"
                v-mask="'#,##'"
                outlined
                dense
                label="Valor cobrado"
                placeholder="4,70"
              />
              <v-row dense>
                <v-col cols="6">
                  <v-btn color="primary" class="not-uppercase" block @click="verifyCard">
                    Concluir
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn color="red" class="not-uppercase" text block @click="cancel">
                    Cancelar
                  </v-btn>
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card>
    </v-dialog>
    <v-dialog v-model="finished" persistent max-width="500">
      <v-card>
        <h1 class="pa-4 font-20 text-center">
          Cartão de crédito adicionado com sucesso :)
        </h1>
        <v-card-actions>
          <v-btn text color="primary" block @click="finish">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
      loading: false,
      showLoading: false,
      show: this.value,
      finished: false,
      creditCard: {
        number: '',
        holder: '',
        dueDate: '',
        securityCode: '',
        name: ''
      },
      storedCard: {
        id: '',
        lastDigits: '',
        name: ''
      },
      chargeValue: '',
      namePlaceHolder: 'Apelido para o cartão (Ex: Nubank do Felipe)',
      step: 1
    }
  },
  computed: {
    disableStepButton () {
      if (this.step === 1) {
        return this.creditCard.number.length < 19 || this.creditCard.holder.length < 2 || this.creditCard.dueDate.length < 5 || this.creditCard.name.length < 3
      } else if (this.step === 2) {
        return this.creditCard.securityCode.length < 3
      } else {
        return this.creditCard.securityCode.length < 3
      }
    }
  },
  watch: {
    value () {
      this.show = this.value
    },
    show () {
      this.$emit('input', this.show)
    },
    loading () {
      if (this.loading) {
        this.showLoading = true
      } else {
        setTimeout(() => {
          this.showLoading = false
        }, 150)
      }
    }
  },
  methods: {
    finish () {
      this.finished = false
      this.show = false
      this.step = 1
      this.resetCard()
    },
    resetCard () {
      this.creditCard = {
        number: '',
        holder: '',
        dueDate: '',
        securityCode: '',
        name: ''
      }
      this.storedCard = {
        id: '',
        lastDigits: '',
        name: ''
      }
      this.chargeValue = ''
      this.namePlaceHolder = 'Apelido para o cartão (Ex: Nubank do Felipe)'
    },
    async addCreditCard () {
      this.loading = true
      try {
        const storedCard = await this.$axios.$post('/user/store-card', {
          creditCard: {
            number: this.creditCard.number,
            expireMonth: this.creditCard.dueDate.split('/')[0],
            expireYear: this.creditCard.dueDate.split('/')[1],
            holderName: this.creditCard.holder
          },
          name: this.creditCard.name
        })
        this.storedCard = storedCard
        this.step++
      } catch (e) {
        this.$pushError('Falha ao adicionar cartão de crédito', e)
      }
      this.loading = false
    },
    async charge () {
      this.loading = true
      try {
        await this.$axios.$post('/user/store-card/charge', {
          creditCard: this.storedCard.id,
          securityCode: this.creditCard.securityCode
        })
        this.step++
      } catch (e) {
        this.$pushError('Falha ao fazer a cobrança', e)
      }
      this.loading = false
    },
    async verifyCard () {
      this.loading = true
      try {
        await this.$axios.$post('/user/store-card/verify', { creditCard: this.storedCard.id, chargeValue: Number(this.chargeValue.replace(',', '.')) })
        const creditCard = await this.$axios.$get('/user/credit-card/get?id=' + this.storedCard.id)
        this.$store.commit('creditCard/addItem', creditCard)
        this.finished = true
        this.show = false
      } catch (e) {
        this.$pushError('Falha ao verificar o cartão', e)
      }
      this.loading = false
    },
    async cancel () {
      this.loading = true
      try {
        await this.$axios.$post('/user/store-card/cancel?id=' + this.storedCard.id)
        this.show = false
        this.step = 1
      } catch (e) {
        this.$pushError('Falha ao cancelar.', e)
        this.show = false
        this.resetCard()
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
