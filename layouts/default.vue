<template>
  <v-app>
    <nav>
      <AppBar />
    </nav>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <GlobalDialog v-if="$store.state.globalDialog.show" />
    <!-- <Debug /> -->
  </v-app>
</template>

<script>
export default {
}
</script>

<style>
</style>
