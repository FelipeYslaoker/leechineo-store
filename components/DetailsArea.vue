<template>
  <div class="text-center">
    <v-row>
      <v-col cols="12">
        <v-rating
          v-model="rating"
          background-color="grey darken-1"
          color="yellow darken-2"
          dense
          half-increments
          hover
          size="25"
        />
        <v-textarea outlined dense placeholder="Descreva sua experiencia (Opcional)" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      rating: 3
    }
  }
}
</script>

<style>
</style>
