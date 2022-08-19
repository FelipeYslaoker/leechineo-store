<template>
  <v-sheet id="le-drawer">
    <v-sheet id="background" />
    <div id="drawer" />
  </v-sheet>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  computed: {
    user () {
      if (this.$store.state.auth.user) {
        const initials = `${this.$store.state.auth.user.name[0]}${this.$store.state.auth.user.surname[0]}`.toUpperCase()
        return {
          initials,
          ...this.$store.state.auth.user
        }
      } else {
        return {
          initials: '',
          name: '',
          email: ''
        }
      }
    }
  }
}
</script>

<style>
#le-drawer {
    z-index: 1;
    position: fixed;
}
#background {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.344);
}
#drawer {
    position: fixed;
    width: 300px;
    background-color: white;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}
@keyframes showDrawer {}
@keyframes showBackgound {}
</style>
