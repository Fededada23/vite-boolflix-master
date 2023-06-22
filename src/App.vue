<script>
  // libraries
  import { store } from './store.js'
  import axios from 'axios'

  // components
  import AppHeader from './components/AppHeader.vue'
  import AppBody from './components/AppBody.vue'

  export default {
    components: {
      AppHeader,
      AppBody,
    },
    data() {
      return {
        store,
      }
    },
    created() {
      this.getcards()
    },
    methods: {
      getcards() {
        axios.get(`${store.url_movies}${store.search}`).then((response) => {
          let provisionCard = response.data.results;
          store.cards = provisionCard.filter(Object => {
            return Object.media_type != 'person'
          });
          store.loading = false;
          axios.get(`${store.url_genres}`).then((response) => {
            let provisionGenres = response.data.genres;
            let objectGenres = [];
            for (let i = 0; i < store.cards.length; i++) {
              for (let j = 0; j < store.cards[i].genre_ids.length; j++) {
                if (store.cards[i].genre_ids.length != 0) {
                  if (!objectGenres.includes(store.cards[i].genre_ids[j])) {
                    objectGenres.push(store.cards[i].genre_ids[j])
                  }
                }
              }
            };
            store.cards_geners = [];
            for (let i = 0; i < provisionGenres.length; i++) {
              if (objectGenres.includes(provisionGenres[i].id))
              store.cards_geners.push(provisionGenres[i])
            }
          })
        });
      },
      changeSearch( newvalue ) {
        store.search = newvalue;
        store.selectedGenre = '';
        store.activeBackdrop = 0;
        this.getcards()
      },
      changeSelect(value) {
        store.selectedGenre = value;
        store.activeBackdrop = 0;
      }
    },
  }
</script>

<template>
  <div class="mycontainer-top">
    <AppHeader :active="store.activeBackdrop" :element="store.cards_geners" @searching="changeSearch" @selecting="changeSelect"/>
    <AppBody />
  </div>
</template>

<style lang="scss">
  @use './styles/general.scss' as *;

  .mycontainer-top {
    display: flex;
    flex-direction: column;
  }
</style>
