<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      class="rounded-lg"
      persistent
      width="500"
    >
      <v-card class="rounded-lg">
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ content }}
        </v-card-text>
        <v-card-actions>
          <v-row dense>
            <v-col cols="12">
              <v-btn block text color="primary" @click="closeDialog">
                Ok
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
      dialog: true,
      title: this.$store.state.globalDialog.title,
      content: this.$store.state.globalDialog.content
    }
  },
  methods: {
    closeDialog () {
      this.$store.commit('setGlobalDialog', {
        title: '',
        content: '',
        show: false
      })
    }
  }
}
</script>
