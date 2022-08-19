<template>
  <div>
    <v-menu
      v-show="$store.state.auth.loggedIn"
      bottom
      min-width="200px"
      rounded
      offset-y
    >
      <template #activator="{ on }">
        <v-btn
          v-show="$store.state.auth.loggedIn"
          icon
          large
          v-on="on"
        >
          <v-avatar
            color="primary"
            :size="size || '38'"
          >
            <span :class="`white--text font-weight-medium ${font ? `font-${font}` : ''}`">{{ user.initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar
              color="red"
              size="48"
              class="ml-3 mb-2"
            >
              <span class="white--text text-h6">{{ user.initials }}</span>
            </v-avatar>
            <h3>{{ user.name }} {{ user.surname }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3" />
            <v-btn
              depressed
              rounded
              to="/account"
              text
            >
              Gerenciar conta
            </v-btn>
            <v-divider class="my-3" />
            <v-btn
              depressed
              rounded
              class="mobile-item"
              to="/cart"
              text
            >
              Carrinho
            </v-btn>
            <v-divider class="my-3 mobile-item" />
            <v-btn
              depressed
              rounded
              to="orders"
              text
            >
              Meus Pedidos
            </v-btn>
            <v-divider class="my-3" />
            <v-btn
              depressed
              rounded
              text
              @click="onLogout"
            >
              Sair
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
    <v-menu
      v-show="!$store.state.auth.loggedIn"
      bottom
      min-width="200px"
      rounded
      offset-y
    >
      <template #activator="{ on, attrs }">
        <v-btn
          v-show="!$store.state.auth.loggedIn"
          icon
          color="primary"
          large
          v-bind="attrs"
          v-on="on"
        >
          <v-icon :size="size || '38'">
            account_circle
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-sheet class="d-flex flex-column py-2">
          <v-btn text to="/login" rounded class="ma-2">
            Entrar
          </v-btn>
          <v-divider />
          <v-btn text to="/criar-conta" rounded class="ma-2">
            Criar conta
          </v-btn>
        </v-sheet>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    font: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    }
  },
  methods: {
    onLogout () {
      this.$emit('logout')
    }
  }
}
</script>

<style>

</style>
