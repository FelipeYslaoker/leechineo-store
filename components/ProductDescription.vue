<template>
  <div class="ma-3" v-html="product.description" />
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
