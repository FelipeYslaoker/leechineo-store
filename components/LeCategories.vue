<template>
  <div>
    <div :class="`d-flex ${selectedCategory ? 'position-absolute z-index-1' : ''}`">
      <v-sheet height="100vh" class="rounded-lg px-2 rounded-lg" color="grey lighten-3">
        <v-sheet v-for="category, i in categories" :key="i" color="transparent">
          <v-sheet class="rounded-lg pa-2 cursor-pointer d-flex align-center my-2" @click="showSubCategories(category)">
            {{ category.name }}
            <v-icon>chevron_right</v-icon>
          </v-sheet>
        </v-sheet>
      </v-sheet>
      <v-sheet v-if="selectedCategory" class="d-flex flex-wrap white--text pa-2 ml-2 rounded-lg" color="primary" width="70vw">
        <v-sheet v-for="subCategory, i in selectedCategory.subCategories" :key="i" color="transparent" class="ma-2 text-center white--text">
          <div>
            <span class="font-weight-bold cursor-pointer">{{ subCategory.name }}</span>
            <v-sheet v-for="subSubCategory, i in subCategory.subSubCategories" :key="i" class="my-3 white--text font-weight-normal" color="transparent">
              <span class="cursor-pointer">{{ subSubCategory.name }}</span>
            </v-sheet>
          </div>
        </v-sheet>
      </v-sheet>
      <v-sheet v-if="selectedCategory" color="transparent" class="ml-2">
        <v-btn color="primary" elevation="0" class="rounded-pill" @click="selectedCategory = null">
          <v-icon>close</v-icon>
        </v-btn>
      </v-sheet>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: [],
      selectedCategory: null
    }
  },
  async fetch () {
    await this.loadAsyncData()
  },
  async beforeMount () {
    if (this.categories.length < 1) {
      await this.loadAsyncData()
    }
  },
  methods: {
    async loadAsyncData () {
      const categories = await this.$axios.$get('/categories/get')
      this.categories = categories
    },
    showSubCategories (category) {
      this.selectedCategory = category
    }
  }
}
</script>

<style lang="scss" scoped>
#expanded-category {
  position: absolute;
  z-index: 1;
}
</style>
