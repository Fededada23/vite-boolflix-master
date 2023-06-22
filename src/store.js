import { reactive } from 'vue'

export const store = reactive({
    url_movies: 'https://api.themoviedb.org/3/search/multi?api_key=0e3cb82b6a9401ecb6a3ffabd624745e&language=en-US&query=',
    url_genres: 'https://api.themoviedb.org/3/genre/movie/list?api_key=0e3cb82b6a9401ecb6a3ffabd624745e&language=en-US',
    cards_geners: [],
    cards: [],
    selectedGenre: '',
    activeBackdrop: 0,
    loading: true,
    search: 'mononoke',
})