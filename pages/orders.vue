<template>
  <div>
    <div v-if="!loading">
      <v-row dense>
        <v-col v-for="order, i in orders" :key="i" cols="12" md="6" lg="4">
          <v-sheet color="primary" class="rounded-lg py-3">
            <p class="font-15 text-center white--text">
              Pedido Numero <span class="font-weight-medium">#128775{{ i }}</span>
            </p>
            <le-address :address="order.address" :selected="false" />
            <p class="text-center white--text">
              Preço final: <strong>R$ {{ order.finalPrice | toBRL }}</strong>
            </p>
            <!-- <v-sheet v-if="order.items.length < 2" color="transparent">
              <le-order-product-tile :item="order.items[0]"></le-order-product-tile>
            </v-sheet>
            <v-sheet v-else color="transparent">
              <le-order-product-tile v-for="item, i in order.items" :key="i" :item="item"></le-order-product-tile>
            </v-sheet> -->
          </v-sheet>
        </v-col>
      </v-row>
    </div>
    <div v-else />
  </div>
</template>

<script>
export default {
  data () {
    return {
      orders: {},
      loading: false
    }
  },
  async mounted () {
    try {
      const orders = await this.$axios.$get('/user/orders')
      this.orders = orders
    } catch (e) {

    }
  }
}
</script>

<style>

</style>
