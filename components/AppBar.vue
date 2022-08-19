<template>
  <div>
    <v-sheet id="appbar" color="white" class="px-3 d-flex flex-column">
      <v-sheet class="mobile-item pt-3">
        <v-sheet color="transparent" class="d-flex justify-space-between align-center px-3 pb-2">
          <v-sheet width="20%" color="transparent">
            <v-btn icon large color="primary" @click="showDrawer = !showDrawer">
              <v-icon>
                menu
              </v-icon>
            </v-btn>
          </v-sheet>
          <v-sheet width="60%" color="transparent">
            <a class="text-h5 font-weight-medium white--text text-decoration-none" @click="$router.push('/')">
              <!-- <v-img src="/leechineo-logo-white.svg" class="desktop-appbar-item" /> -->
              <v-sheet id="title" class="primary--text rounded text-center py-1">Leechineo</v-sheet>
            </a>
          </v-sheet>
          <v-sheet width="20%" color="transparent" class="d-flex justify-end">
            <user-menu :user="user" @logout="logoutDialog = true" />
          </v-sheet>
        </v-sheet>
        <v-sheet color="transparent">
          <le-product-search />
        </v-sheet>
      </v-sheet>
      <v-sheet class="desktop-item">
        <v-sheet class="d-flex flex-column justify-center" color="transparent">
          <v-sheet color="transparent" class="d-flex aling-center">
            <a class="text-h5 font-weight-medium white--text mt-2 d-flex align-center mr-3" @click="$router.push('/')">
              <img src="/leechineo-logo.svg" width="40px" alt="Logo">
            </a>
            <v-sheet style="flex: 1 1 auto;">
              <le-product-search />
            </v-sheet>
            <v-sheet id="items" class="d-flex align-center">
              <v-sheet v-for="item, i in menuItems" :key="i" class="d-flex align-center pa-1 cursor-pointer ml-4" @click="$router.push(item.to)">
                <v-icon color="primary" small>
                  {{ item.icon }}
                </v-icon>
                <span class="primary--text ml-2 font-12">{{ item.title }}</span>
              </v-sheet>
              <user-menu :user="user" font="10" size="27" @logout="logoutDialog = true" />
            </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-sheet>
    <v-navigation-drawer v-model="showDrawer" absolute class="pt-3 px-3">
      <v-btn text block color="primary" class="not-uppercase" to="/cart">
        Carrinho
      </v-btn>
    </v-navigation-drawer>
    <v-dialog
      v-model="logoutDialog"
      class="rounded-lg"
      persistent
      width="500"
    >
      <v-card class="rounded-lg">
        <v-card-title class="text-h5">
          Deseja realmente sair da sua conta?
        </v-card-title>
        <v-card-text>
          Você poderá entrar a hora que quiser, mas lembre-se de anotar suas credenciais :)
        </v-card-text>
        <v-card-actions>
          <v-row dense>
            <v-col cols="6">
              <v-btn block text color="primary" @click="logoutDialog = false">
                Cancelar
              </v-btn>
            </v-col>
            <v-col>
              <v-btn color="error" text block @click="logout">
                Sair
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDrawer: false,
      logoutDialog: false,
      menuItems: [
        {
          title: 'Carrinho',
          icon: 'shopping_cart',
          to: '/cart'
        },
        {
          title: 'Favoritos',
          icon: 'favorite',
          to: '/favoritos'
        }
      ],
      socialIcons: [
        {
          icon: 'whatsapp',
          href: '#'
        },
        {
          icon: 'instagram',
          href: '#'
        },
        {
          icon: 'facebook',
          href: '#'
        },
        {
          icon: 'twitter',
          href: '#'
        }
      ]
    }
  },
  computed: {
    user () {
      if (this.$store.state.auth.user) {
        const initials = `${this.$store.state.auth.user.name[0]}${this.$store.state.auth.user.surname[0]}`.toUpperCase()
        return {
          initials,
          ...this.$store.state.auth.user
        }
      } else {
        return {
          initials: '',
          name: '',
          email: ''
        }
      }
    }
  },
  methods: {
    async logout () {
      try {
        this.$nuxt.$loading.start()
        await this.$auth.logout()
        this.logoutDialog = false
        this.$nuxt.$loading.finish()
      } catch (e) {
        this.$nuxt.$loading.finish()
        this.$store.commit('setGlobalDialog', {
          title: 'Falha ao sair.',
          content: e?.response?.data?.message || 'Erro interno do servidor, tente novamente mais tarde.',
          show: true
        })
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');

#appbar {
    width: 100%;
}
#title {
    background: rgb(167,181,255);
    background: linear-gradient(25deg, rgba(167,181,255,1) 0%, rgba(213,219,255,1) 51%, rgba(255,255,255,1) 100%);
}
.fa {
  text-decoration: none;
}
.fa:hover {
  opacity: 0.7;
}
</style>
