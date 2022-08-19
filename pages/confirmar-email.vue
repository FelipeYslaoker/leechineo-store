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
            Digite sua senha
          </h3>
          <v-text-field
            v-model="password"
            label="Senha"
            type="password"
            dense
            outlined
            :rules="rules"
          />
          <v-btn
            color="grey darken-4"
            class="white--text rounded-lg"
            elevation="0"
            block
            @click="confirmEmail"
          >
            Confirmar email
          </v-btn>
        </v-sheet>
      </v-form>
    </div>
  </LeColumn>
</template>

<script>
export default {
  layout: 'clean',
  middleware: 'allowConfirmEmail',
  data () {
    return {
      password: '',
      rules: [
        password => password.length >= 8 || 'A senha deve ser válida.'
      ]
    }
  },
  head: {
    title: 'Confirmar email'
  },
  methods: {
    async confirmEmail () {
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        this.$nuxt.$loading.start()
        await this.$axios.$post(`/auth/confirm-email${this.$nuxt._route.query.token ? `?token=${this.$nuxt._route.query.token}` : ''}`, {
          password: this.password
        })
        this.$nuxt.$loading.finish()
        this.$router.push('/')
        this.$store.commit('setGlobalDialog', {
          title: 'Sucesso!',
          content: 'Seu email foi confirmado com sucesso.',
          show: true
        })
      } catch (e) {
        this.$nuxt.$loading.finish()
        this.$store.commit('setGlobalDialog', {
          title: 'Falha ao confirmar email',
          content: e.response.data.message,
          show: true
        })
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
