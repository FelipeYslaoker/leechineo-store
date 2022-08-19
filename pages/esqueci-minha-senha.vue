<template>
  <LeColumn class="justify-center">
    <div class="d-flex justify-space-between">
      <v-btn color="grey lighten-4" elevation="0" class="rounded-lg" to="/">
        Página inicial
      </v-btn>
    </div>
    <div class="signup-area d-flex flex-column justify-center align-center">
      <v-form ref="form">
        <v-sheet
          class="d-flex flex-column justify-center pa-4 rounded-lg"
          color="grey lighten-4"
        >
          <h3 class="title mb-3">
            Esqueci minha senha
          </h3>
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            dense
            outlined
            :rules="rules.email"
          />
          <v-btn
            color="grey darken-4"
            class="white--text rounded-lg"
            elevation="0"
            block
            @click="sendEmail"
          >
            Receber email
          </v-btn>
        </v-sheet>
      </v-form>
    </div>
  </LeColumn>
</template>

<script>
export default {
  layout: 'clean',
  middleware: 'preventAuthedUser',
  data: () => ({
    form: {
      email: ''
    },
    rules: {
      email: [
        email =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          ) || 'O email deve ser válido.'
      ]
    }
  }),
  head: {
    title: 'Esqueci minha senha'
  },
  methods: {
    async sendEmail () {
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        this.$nuxt.$loading.start()
        await this.$axios.$post('/auth/forgot-password', {
          email: this.form.email
        })
        this.$nuxt.$loading.finish()
        this.$router.push('/')
        this.$store.commit('setGlobalDialog', {
          title: 'Sucesso!',
          content: 'O email de redefinição de senha foi enviado com sucesso.',
          show: true
        })
      } catch (e) {
        this.$nuxt.$loading.finish()
        if (e.response) {
          this.$store.commit('setGlobalDialog', {
            title: 'Falha ao enviar email',
            content: e.response.data.message,
            show: true
          })
        }
        this.$store.commit('setError', e)
      }
    }
  }
}
</script>

<style>
.signup-area {
  height: 90vh;
}
</style>
