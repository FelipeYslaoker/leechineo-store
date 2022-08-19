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
            Redefinir senha
          </h3>
          <v-text-field
            v-if="$store.state.auth.loggedIn"
            v-model="form.currentPassword"
            :rules="rules.currentPassword"
            label="Senha atual"
            type="password"
            dense
            outlined
          />
          <v-text-field
            v-model="form.newPassword"
            :rules="rules.newPassword"
            label="Nova senha"
            type="password"
            dense
            outlined
          />
          <v-text-field
            v-model="form.verifiedPassword"
            :rules="rules.verifiedPassword"
            label="Confirmar senha"
            type="password"
            dense
            outlined
          />
          <v-btn
            color="grey darken-4"
            class="white--text rounded-lg"
            elevation="0"
            block
            @click="resetPassword"
          >
            Redefinir senha
          </v-btn>
        </v-sheet>
      </v-form>
    </div>
  </LeColumn>
</template>

<script>
export default {
  layout: 'clean',
  middleware: 'allowResetPassword',
  data () {
    return {
      token: this.$nuxt._route.query.id,
      form: {
        currentPassword: '',
        newPassword: '',
        verifiedPassword: ''
      },
      rules: {
        currentPassword: [
          currentPassword => currentPassword.length >= 8 || 'A senha deve ser válida.'
        ],
        newPassword: [
          password => password.length >= 8 || 'A senha deve ser válida.'
        ],
        verifiedPassword: [
          verifiedPassword => verifiedPassword.length >= 8 || 'A senha deve ser válida.'
        ]
      }
    }
  },
  head: {
    title: 'Redefinir senha'
  },
  methods: {
    async resetPassword () {
      if (!this.$refs.form.validate()) {
        return
      }
      if (this.form.newPassword !== this.form.verifiedPassword) {
        return this.$store.commit('setGlobalDialog', {
          title: 'Falha ao criar conta.',
          content: 'As senhas não correpondem.',
          show: true
        })
      }
      try {
        this.$nuxt.$loading.start()
        await this.$axios.$post(`/auth/reset-password${this.$nuxt._route.query.token ? `?token=${this.$nuxt._route.query.token}` : ''}`, {
          currentPassword: this.form.currentPassword,
          password: this.form.newPassword
        })
        this.$nuxt.$loading.finish()
        this.$router.push('/')
        this.$store.commit('setGlobalDialog', {
          title: 'Sucesso!',
          content: 'Sua senha foi redefinida com sucesso.',
          show: true
        })
      } catch (e) {
        this.$nuxt.$loading.finish()
        this.$store.commit('setGlobalDialog', {
          title: 'Falha ao redefinir senha',
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
