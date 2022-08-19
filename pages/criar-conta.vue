<template>
  <div>
    <LeColumn class="justify-center">
      <div class="d-flex justify-space-between">
        <v-btn color="grey lighten-4" elevation="0" class="rounded-lg" to="/">
          Página inicial
        </v-btn>
        <v-btn
          color="grey lighten-4"
          elevation="0"
          class="rounded-lg"
          to="/login"
        >
          Entrar
        </v-btn>
      </div>
      <div class="signup-area d-flex flex-column justify-center align-center">
        <v-form ref="form">
          <v-sheet
            class="d-flex flex-column justify-center pa-4 rounded-lg"
            color="grey lighten-4"
          >
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="form.name"
                  :rules="rules.name"
                  outlined
                  dense
                  label="Nome"
                  placeholder="Marcos"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.surname"
                  :rules="rules.surname"
                  outlined
                  dense
                  label="Sobrenome"
                  placeholder="Felipe"
                />
              </v-col>
            </v-row>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  :rules="rules.date"
                  outlined
                  dense
                  label="Data de nascimento"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="date"
                locale="pt-br"
                :active-picker.sync="activePicker"
                :max="
                  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)
                "
                min="1950-01-01"
                @change="save"
              />
            </v-menu>
            <v-text-field
              v-model="form.cpf"
              v-mask="'###.###.###-##'"
              :rules="rules.cpf"
              outlined
              dense
              label="CPF"
              placeholder="000.000.000-00"
            />
            <v-text-field
              v-model="form.email"
              :rules="rules.email"
              outlined
              type="email"
              dense
              label="E-mail"
            />
            <v-row dense>
              <v-col cols="6">
                <v-text-field
                  v-model="form.password"
                  type="password"
                  :rules="rules.password"
                  outlined
                  dense
                  label="Senha"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.verifiedPassword"
                  type="password"
                  :rules="rules.verifiedPassword"
                  outlined
                  dense
                  label="Confirme sua senha"
                />
              </v-col>
            </v-row>
            <v-checkbox
              v-model="form.acceptedTerms"
              label="Declaro que li e concordo com os termos"
            />
            <v-btn
              elevation="0"
              class="rounded-lg white--text"
              block
              color="grey darken-4"
              :disabled="!form.acceptedTerms"
              @click="createAccount"
            >
              Criar conta
            </v-btn>
          </v-sheet>
        </v-form>
      </div>
    </LeColumn>
  </div>
</template>

<script>
export default {
  layout: 'clean',
  middleware: 'preventAuthedUser',
  data: () => ({
    activePicker: null,
    date: null,
    menu: false,
    form: {
      name: '',
      surname: '',
      cpf: '',
      email: '',
      password: '',
      verifiedPassword: '',
      acceptedTerms: false
    },
    rules: {
      name: [
        name => name.length > 2 || 'O nome deve ser válido.'
      ],
      surname: [
        surname => surname.length > 2 || 'O sobrenome deve ser válido.'
      ],
      cpf: [
        (cpf) => {
          const cpfError = 'O CPF deve ser válido.'
          if (typeof cpf !== 'string') { return cpfError }
          cpf = cpf.replace(/[^\d]+/g, '')
          if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) { return cpfError }
          cpf = cpf.split('')
          const validator = cpf
            .filter(
              (digit, index, array) => index >= array.length - 2 && digit
            )
            .map(el => +el)
          const toValidate = pop =>
            cpf
              .filter(
                (digit, index, array) => index < array.length - pop && digit
              )
              .map(el => +el)
          const rest = (count, pop) =>
            ((toValidate(pop).reduce(
              (soma, el, i) => soma + el * (count - i),
              0
            ) *
                10) %
                11) %
              10
          if (!(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1])) { return true }
          return cpfError
        }
      ],
      email: [
        email => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || 'O email deve ser válido.'
      ],
      password: [
        password => password.length >= 8 || 'A senha deve ser válida.'
      ],
      verifiedPassword: [
        verifiedPassword => verifiedPassword.length >= 8 || 'A senha deve ser válida.'
      ],
      date: [
        date => (date || '').length === 10 || 'A data de nascimento deve ser válida.'
      ]
    }
  }),
  head: {
    title: 'Criar Conta'
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    async createAccount () {
      if (this.form.password !== this.form.verifiedPassword) {
        return this.$store.commit('setGlobalDialog', {
          title: 'Falha ao criar conta.',
          content: 'As senhas não correpondem.',
          show: true
        })
      }
      if (!this.$refs.form.validate()) {
        return
      }
      const splitDate = this.date.split('-')
      const date = {
        day: splitDate[2],
        month: splitDate[1],
        year: splitDate[0]
      }
      try {
        this.$nuxt.$loading.start()
        await this.$axios.$post('/auth/create-account', {
          ...this.form,
          birthday: date
        })
        await this.$auth.loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
        this.$nuxt.$loading.finish()
      } catch (e) {
        this.$nuxt.$loading.finish()
        this.$store.commit('setGlobalDialog', {
          title: 'Falha ao criar conta.',
          content: e?.response?.data?.message || '',
          color: 'red lighten-2',
          textColor: 'white--text',
          show: true
        })
      }
    }
  }
}
</script>

<style scoped>
.signup-area {
  height: 100vh;
}
</style>
