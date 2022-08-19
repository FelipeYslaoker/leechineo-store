<template>
  <div>
    <v-select v-model="select" dense outlined :items="variants.options.map(option => option.name)" />
  </div>
</template>

<script>
export default {
  props: {
    variants: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      select: this.variants.options.map(option => option.name)[0] || ''
    }
  },
  watch: {
    select (value) {
      this.$store.commit('products/setSelectedVariant', [value])
    }
  },
  created () {
    this.$store.commit('products/setSelectedVariant', [this.select])
  },
  beforeDestroy () {
    this.$store.commit('products/setSelectedVariant', [])
  }
}
</script>

<style>

</style>
