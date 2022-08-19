<template>
  <div v-if="loading">
    <v-dialog v-model="loading" width="200" persistent class="rounded-xl">
      <div v-if="loading">
        <div style="position: absolute; top: 0px; left: 0px; width: 100vw; height: 100vh; background-color: rgba(255, 255, 255, .9); z-index: 1000; display: flex; align-items: center; justify-content: center;">
          <v-progress-circular
            :size="70"
            :width="7"
            indeterminate
            color="primary"
          />
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
