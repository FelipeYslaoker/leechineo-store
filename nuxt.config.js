import colors from 'vuetify/es5/util/colors'
require('dotenv').config()

export default {
  loading: '~/components/LoadingBar.vue',
  target: 'server',

  head: {
    title: 'Leechineo - A melhor maneira de simplificar o seu futuro!',
    htmlAttrs: {
      lang: 'pt-br'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'description', content: 'A Leechineo é uma loja Chinesa com grande variedade de produtos eletrônicos, calçados e muito mais.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Round' }
    ]
  },

  css: [
    '@/assets/global.scss'
  ],

  plugins: [
    '~/plugins/vue-mask.js',
    '~/plugins/v-copy.js',
    '~/plugins/updateCart.js',
    '~/plugins/to-brl.js',
    '~/plugins/pushError.js'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          maxAge: 43200
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          user: { url: '/user/get', method: 'get' },
          logout: { url: '/auth/logout', method: 'post' }
        }
      }
    }
  },
  axios: {
    baseURL: process.env.API_URL
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
  }
}
