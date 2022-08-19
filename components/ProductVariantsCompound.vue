<template>
  <div>
    <v-row>
      <v-col v-for="(attribute, i) in variants.attributes" :key="i" cols="6">
        <v-select
          v-model="selectedItems[i]"
          :placeholder="attribute"
          :items="$store.getters['products/getVariantsOptions'](variants, selectedItems, i)"
          outlined
          :disabled="disabledInput(i)"
          dense
        />
      </v-col>
    </v-row>
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
      selectedItems: []
    }
  },
  watch: {
    selectedItems: {
      deep: true,
      handler () {
        this.selectedItems.forEach((_, i) => {
          if (!(this.$store.getters['products/getVariantsOptions'](this.variants, this.selectedItems, i).includes(_))) {
            this.selectedItems.splice(i, 1)
          }
        })
        this.$store.commit('products/setSelectedVariant', [...this.selectedItems])
      }
    }
  },
  beforeDestroy () {
    this.$store.commit('products/setSelectedVariant', [])
  },
  methods: {
    disabledInput (i) {
      if (i === 0) {
        return false
      } else if (this.selectedItems[i - 1]) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>

</style>
