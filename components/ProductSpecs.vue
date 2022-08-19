<template>
  <div class="ma-3">
    <v-sheet v-for="(spec, i) in product.specifications" :key="i" :color="i === 0 || i%2 === 0 ? 'grey lighten-3' : 'white'" class="pa-3 rounded-lg">
      <div class="d-flex flex-row justify-space-between">
        <span class="font-weight-medium">{{ spec.title }}</span>
        <span>{{ spec.description }}</span>
      </div>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
