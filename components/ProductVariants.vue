<template>
  <div>
    <div class="d-flex flex-row justify-center">
      <v-sheet :width="variants.type === 'unique' ? '' : '92%'" :class="variants.type === 'unique' ? 'ml-5' : ''">
        <h4 class="font-weight-bold black--text mb-3">
          {{ variants.title }}
        </h4>
        <template v-if="variants.type === 'unique'">
          <p v-if="variants.option.name" class="mb-3">
            {{ variants.option.name }}
          </p>
        </template>
        <ProductVariantsUnique v-if="variants.type === 'unique'" :variants="variants" />
        <ProductVariantsSimple v-if="variants.type === 'simple'" :variants="variants" />
        <ProductVariantsCompound v-if="variants.type === 'compound'" :variants="variants" />
      </v-sheet>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variants: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
