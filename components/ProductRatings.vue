<template>
  <le-column>
    <v-sheet color="grey lighten-4" class="pa-3 mt-3 ma-md-3 rounded-lg">
      <div class="d-flex flex-column flex-md-row">
        <div class="mx-md-3">
          <div class="d-flex flex-column align-center">
            <span class="primary--text font-weight-medium text-h5">4,7 de 5</span>
            <v-rating
              :value="product.rating"
              dense
              readonly
              background-color="primary"
              color="primary"
              half-increments
            />
            <v-btn color="primary" elevation="0" class="rounded-lg ma-2">
              Deixar uma avaliacao
            </v-btn>
          </div>
        </div>
        <v-sheet color="transparent" class="ml-md-3">
          <v-chip-group :value="filters.ratings" mandatory active-class="primary--text" column>
            <v-chip>Todos</v-chip>
            <v-chip>1 Estrela</v-chip>
            <v-chip>2 Estrela</v-chip>
            <v-chip>3 Estrela</v-chip>
            <v-chip>4 Estrela</v-chip>
            <v-chip>5 Estrela</v-chip>
            <v-chip>Com midia</v-chip>
          </v-chip-group>
        </v-sheet>
      </div>
    </v-sheet>
    <v-sheet class="my-3 ma-md-3">
      <v-sheet v-for="(rating, i) in ratings" :key="i" class="rounded-lg my-2 pa-3" color="grey lighten-4">
        <v-sheet color="transparent" class="d-flex flex-row justify-space-between">
          <div class="d-flex flex-row">
            <v-avatar size="36">
              <img
                :src="rating.user.profilePic"
                :alt="'Foto de ' + rating.user.name"
              >
            </v-avatar>
            <div>
              <span class="mx-2 font-weight-medium">{{ rating.user.name }}</span>
              <v-rating
                :value="rating.rating"
                class="mx-2"
                size="18"
                readonly
                half-increments
                dense
              />
            </div>
          </div>
          <v-btn icon>
            <v-icon>flag</v-icon>
          </v-btn>
        </v-sheet>
        <div class="py-3 mx-3 d-flex flex-row flex-wrap">
          <v-sheet
            v-for="n in 5"
            :key="n"
            color="grey lighten-3"
            class="rounded-lg ma-2 desktop-item"
            width="70"
            height="70"
          />
          <v-slide-group>
            <v-slide-item
              v-for="n in 5"
              :key="n"
            >
              <v-sheet
                color="grey lighten-3"
                class="rounded-lg ma-2 mobile-item"
                width="70"
                height="70"
              />
            </v-slide-item>
          </v-slide-group>
        </div>
        <div class="ml-6 mt-3">
          <p class="font-weight-medium">
            {{ rating.title }}
          </p>
          <p>{{ rating.description }}</p>
        </div>
      </v-sheet>
    </v-sheet>
  </le-column>
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
      filters: {
        ratings: 0
      },
      ratings: [
        {
          user: {
            name: 'Felipe Yslaoker',
            profilePic: 'https://telegram.im/img/felipeyslaoker'
          },
          variant: 'Cor: Branco, Tamanho: P',
          title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis augue urna, sed efficitur nunc laoreet non. Sed eget mollis lorem. Proin vitae gravida lacus. Proin euismod vehicula vulputate. Pellentesque vitae sem nec sem placerat imperdiet sed sit amet ligula. Curabitur dapibus lectus vitae malesuada semper. Suspendisse vel felis non urna tempus tincidunt. Curabitur varius quis quam in viverra. Sed non turpis at metus scelerisque vestibulum sit amet id tortor. Suspendisse tincidunt bibendum nisi rhoncus tristique. Suspendisse volutpat ultricies sem ut sagittis. Mauris id auctor leo, vitae semper odio. Ut gravida varius lacus, id pulvinar arcu consequat a. Suspendisse vehicula eros maximus mi malesuada, ut fringilla elit laoreet. Mauris at libero pharetra, tristique tortor eu, rutrum libero. Donec tincidunt neque eu arcu dictum elementum at eu orci.',
          rating: 4.5,
          medias: [
            {
              type: 'video',
              url: 'https://asdfasdf.com/asdfasdf.mp4'
            },
            {
              type: 'image',
              url: 'https://asdfasdf.com/asdfas.png'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style>

</style>
