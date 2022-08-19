<template>
  <div>
    <v-sheet
      :class="`rounded-lg pa-2 my-3 mx-2 d-flex flex-column ${
        selected ? 'white--text background-transition' : ''
      }`"
      :color="
        selected
          ? 'primary'
          : 'white'
      "
      @click="$store.commit('address/setSelected', index)"
    >
      <div class="d-flex align-center">
        <v-icon
          size="15"
          :color="selected ? 'white' : 'black'"
          class="mr-2"
        >
          my_location
        </v-icon>
        <strong class="unselectable">{{ address.city }}-{{ address.state }}</strong>
      </div>
      <span class="unselectable">{{ address.street }} - {{ address.number }},
        {{ address.district }}</span>
      <span class="unselectable">{{ address.zipcode }}</span>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    address: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: false
    }
  }
}
</script>

<style>

</style>
