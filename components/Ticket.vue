<template>
  <div>
    <div style="position: absolute; width: 130px; height: 110px; border-right: 2px dashed blue;" />
    <v-sheet color="red" width="150px" height="110px" class="pb-3 px-3">
      <v-sheet width="100%" height="30px" color="transparent" class="white--text d-flex justify-space-around align-center font-weight-bold mb-2">
        <v-icon color="yellow">
          star
        </v-icon>
        {{ ticket.name }}
        <v-icon color="yellow">
          star
        </v-icon>
      </v-sheet>
      <v-sheet color="grey lighten-3" height="60px" width="100%" class="text-h5 font-weight-bold d-flex align-center justify-center" style="background-image: url(/media/ticket/leechineo-ticket-background.svg); background-size: 25px; background-repeat: round;">
        {{ ticket.discount.type === 'currency' ? '-R$' : '' }}{{ Math.ceil(ticket.discount.value) }}{{ ticket.discount.type === 'percent' ? '% OFF' : '' }}
      </v-sheet>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    ticket: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
