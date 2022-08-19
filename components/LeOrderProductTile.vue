<template>
  <div>
    <v-sheet color="white" class="pa-2 rounded-lg my-2 mx-3 d-flex">
      <v-img max-width="50" :src="item.image" />
      <div>
        <p class="font-weight-medium">
          {{ item.name }}
        </p>
        <p>R$ {{ item.price.finalPrice | toBRL }}</p>
      </div>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      require: true
    }
  }
}
</script>

<style>

</style>
