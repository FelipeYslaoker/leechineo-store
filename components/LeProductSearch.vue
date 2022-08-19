<template>
  <div>
    <div id="search-background" :class="`search-background-${showSearch ? 'active' : 'inactive'}`" @click="closeSearch" />
    <v-sheet id="search-input" :class="`search-input-${showSearch ? 'active' : 'inactive'} my-2 mx-2 d-flex pt-2`" height="55px" color="transparent">
      <v-text-field
        v-model="value"
        solo
        color="transparent"
        flat
        class="rounded-lg"
        placeholder="Pesquisar..."
        prepend-inner-icon="search"
        full-width
        dense
        background-color="grey lighten-3"
        @focus="openSearch"
      />
      <v-btn
        v-show="showSearch"
        icon
        large
        color="white"
        class="ml-1"
        @click="closeSearch"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-sheet>
    <v-expand-transition>
      <v-sheet class="d-flex justify-center suggestions-active" width="100vw" color="transparent">
        <v-sheet v-show="showSearch" id="suggestions" class="rounded-lg pa-2 my-2 mx-2" width="90%">
          <v-sheet v-for="i in 5" :key="i" class="my-1 px-3" height="40px">
            Sugestão {{ i }}
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showSearch: false,
      value: ''
    }
  },
  beforeMount () {
    window.addEventListener('beforeunload', (e) => {
      if (this.showSearch) {
        this.closeSearch()
      }
    })
  },
  methods: {
    openSearch () {
      setTimeout(() => {
        document.querySelector('#suggestions').style.display = 'block'
      }, 150)
      this.showSearch = true
      document.querySelector('body').style.overflowY = 'hidden'
      document.querySelector('body').style.height = '100vh'
    },
    closeSearch () {
      this.value = ''
      this.showSearch = false
      document.querySelector('body').style.overflowY = ''
      document.querySelector('body').style.height = ''
      setTimeout(() => {
        document.querySelector('#suggestions').style.display = 'none'
      }, 150)
    }
  }
}
</script>

<style>
.search-background-active {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, .5);
    top: 0px;
    left: 0px;
    backdrop-filter: blur(3px);
    animation: showBackground .150s normal;
}
.search-background-inactive {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100vh;
    background-color: transparent;
    display: none;
    top: 0px;
    left: 0px;
    backdrop-filter: blur(0px);
    animation: hiddenBackground .150s reverse;
}
.suggestions-active {
    position: absolute;
    z-index: 1;
    left: 0px;
    overflow-x: hidden;
    overflow-y: scroll;
}
.suggestions-inactive {
    position: absolute;
    z-index: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 0px;
    overflow: hidden;
    animation: hiddenSuggestions .150s normal;
}
.search-input-active {
    position: sticky;
    z-index: 1;
}
@keyframes showBackground {
    from {
        background-color: transparent;
        backdrop-filter: blur(0px);
    }
    to {
        background-color: rgba(0, 0, 0, .5);
        backdrop-filter: blur(3px);
    }
}
@keyframes hiddenBackground {
    from {
        background-color: rgba(0, 0, 0, .5);
        backdrop-filter: blur(3px);
    }
    to {
        background-color: transparent;
        backdrop-filter: blur(0px);
    }
}
@keyframes showSuggestions {
    from {
        height: 0px;
    }
    to {
        height: 150px;
    }
}
@keyframes hiddenSuggestions {
    from {
        height: 150px;
    }
    to {
        height: 0px;
    }
}
</style>
