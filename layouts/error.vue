<template>
  <v-app>
    <div class="d-flex flex-column justify-center align-center error-screen">
      <v-sheet v-if="error.statusCode === 404" class="d-flex flex-column justify-center align-center">
        <h2>Página não encontrada</h2>
        <v-img src="/404.svg" max-width="260" />
        <v-btn elevation="0" color="primary" class="rounded-lg ma-5" @click="goToInitial">
          Página inicial
        </v-btn>
      </v-sheet>
      <v-sheet v-else>
        <h1>
          {{ otherError }}
        </h1>
        <v-btn elevation="0" color="primary" class="rounded-lg ma-5" @click="goToInitial">
          Página inicial
        </v-btn>
      </v-sheet>
    </div>
  </v-app>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Página não encontrada',
      otherError: 'Ocorreu um erro'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  methods: {
    goToInitial () {
      this.$nuxt.$loading.start()
      const protocol = `${window.location.protocol}//`
      const host = window.location.hostname
      const port = `:${window.location.port}` || ''
      window.location.href = `${protocol}${host}${port}/`
    }
  }
}
</script>

<style scoped>
body {
  overflow-y: hidden !important;
}
.error-screen {
  width: 100vw;
  height: 60vh;
}
h1 {
  font-size: 20px;
}
</style>
