<script>
    import { store } from '../store.js';

    // components
    import AppContent from './AppContent.vue';
    
    export default {
        components: {
            AppContent,
        },
        data() {
            return {
                store,
            }
        },
        computed: {
            arraycards() {
                if (store.selectedGenre == '') {
                    return store.cards
                }
                else {
                    let arrayfiltered = store.cards.filter(object => {
                        for (let i = 0; i < object.genre_ids.length; i++) {
                            if (object.genre_ids[i] == store.selectedGenre) {
                                return object
                            }
                        }
                    });
                    return arrayfiltered
                }
            }
        },
        methods: {
            backImage(value) {
                if (store.cards.length !== 0) {
                    if (value.backdrop_path) {
                        return `https://image.tmdb.org/t/p/original${value.backdrop_path}`
                    }
                    else {
                        return "/netflix-monthly-releases.jpg"
                    }
                }
                else {
                    return "/netflix-monthly-releases.jpg"
                }
            },
            getActiveBackdrop(value) {
                store.activeBackdrop = value;
            },
            getBackTitle(value) {
                if(value.media_type == 'tv') {
                    return value.name
                }
                else {
                    return value.title
                }
            },
            backType(value) {
                if (value.media_type == 'tv') {
                    return 'tv-series'
                }
                return value.media_type
            },
            getBackDescription(value) {
                let text = value.overview;
                let textOk = text.substring(0, 1000) + '...';
                return textOk
            },
            getBackStars(value) {
                let vote = Math.round((value.vote_average) / 2);
                let star = [];
                for(let i = 0; i < vote; i++) {
                    star.push({icona:'fa-solid fa-star', size:'2x'})
                }
                let voteNot = 5 - vote;
                for(let i = 0; i < voteNot; i++) {
                    star.push({icona:'fa-regular fa-star', size:'1x'})
                }
                return star
            },
        }
    }
</script>

<template>
    <main>
        <section>
            <div class="container-fluid">
                <div class="row">
                    <div class="col p-0">
                        <div v-if="store.loading == false" class="mycard-backimg">
                            <img :src="backImage(arraycards[store.activeBackdrop])" alt="BackImage">
                            <div v-if="store.cards.length === 0" class="description">
                                <h1>SEARCH NOT FOUND</h1>
                            </div>
                            <div v-else class="description">
                                <h1 v-if="!arraycards[store.activeBackdrop].backdrop_path" class="mb-5 text-decoration-underline">Image Not Available</h1>
                                <h1 class="mb-2">{{ getBackTitle(arraycards[store.activeBackdrop]) }}</h1>
                                <div class="mb-5 fs-4">{{ backType(arraycards[store.activeBackdrop]) }}</div>
                                <p class="fs-4 mb-4">{{ arraycards[store.activeBackdrop].overview }}</p>
                                <div class="d-flex">
                                    <div class="align-text-bottom fs-4 me-2">Vote:</div>
                                    <div class="stars d-flex align-items-end text-warning">
                                        <div class="d-flex align-items-end me-1" v-for="(value, index) in getBackStars(arraycards[store.activeBackdrop])" :key="index"><font-awesome-icon :icon="value.icona" :size="value.size"/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row content">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <div class="mycard">
                                    <h2 class="m-0 mt-4">NETFLIX ORIGINALS</h2>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div v-if="store.cards.length !== 0" class="col">
                                <div class="mycard">
                                    <ul>
                                        <li v-for="(value, index) in arraycards" :key="index" @mouseover="getActiveBackdrop(index)" class="me-3">
                                            <AppContent :element="value"/>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div v-if="store.cards.length === 0 && store.loading == false" class="col">
                                <div class="card mt-4 align-items-center justify-content-center">
                                    <h1>SEARCH NOT FOUND</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped lang="scss">
    @use '../styles/partials/variables.scss'as *;

    main {
        flex-grow: 1;
        height: 100%;
        background-color: $bg-brown;

        .mycard-backimg {
            height: 800px;
            position: relative;
            overflow: hidden;
            
            img {
                width: 100%;
                border-radius: 0px 0px 10px 10px;
            }

            .description {
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                padding: 50px 50px;
                color: $color-white;
                background: linear-gradient(rgba(0,0,0,64%) 60%, rgba(0,0,0,50%) 80%, transparent 100%);
                text-shadow: 5px 1px 10px black;

                p {
                    width: 65%;
                }
            }
        }

        .row.content {
            margin-top: -200px;
            position: relative;
            padding: 0 20px;
            z-index: 5;

            h2 {
                display: inline-block;
                color: $color-white;
                border-radius: 10px;
                background: linear-gradient(rgba(0,0,0,50%) 40%, rgba(0,0,0,25%) 80%, transparent 100%);
                text-shadow: 5px 0px 10px black;
            }
            
            ul {
                list-style-type: none;
                padding: 0;
                margin: 0;
                display: flex;
                overflow-x: scroll;
    
                li {
                    margin-top: 40px;
                    margin-bottom: 40px;
                }
            }
    
            .card {
                height: 500px;
            }
        }

    }
</style>