<template>
  <div>
    <section>
      <v-row dense>
        <!-- <v-col cols="2" class="desktop-item">
          <le-categories />
        </v-col> -->
        <v-col cols="12">
          <div>
            <v-sheet v-for="section in sections" :key="section._id">
              <BannerTile v-if="section.type === 'banner'" :section="section" />
              <ProductTile v-else :section="section" />
            </v-sheet>
          </div>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sections: []
    }
  },
  async fetch () {
    try {
      const response = await this.$axios.$get('/sections/get')
      this.sections = response.sections
    } catch (e) {
      this.$store.commit('setGlobalDialog', {
        title: 'Erro ao carregar conteúdo',
        content: 'Falha ao conectar no banco de dados'
      })
    }
  }
}
</script>
