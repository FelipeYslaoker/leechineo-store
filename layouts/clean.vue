<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>
    <GlobalDialog v-if="$store.state.globalDialog.show" />
    <Debug />
  </v-app>
</template>

<script>
export default {

}
</script>

<style>

</style>
