<script>
    export default {
        props: {
            element: Object,
        },
        methods: {
            title(value) {
                if(value.media_type == 'tv') {
                    return value.name
                }
                else {
                    return value.title
                }
            },
            original_title(value) {
                if(value.media_type == 'tv') {
                    return value.original_name
                }
                else {
                    return value.original_title
                }
            },
            type(value) {
                if (value.media_type == 'tv') {
                    return 'tv-series'
                }
                return value.media_type
            },
            image(value) {
                return `https://image.tmdb.org/t/p/w500${value.poster_path}`
            },
            description(value) {
                let text = value.overview;
                let textOk = text.substring(0, 250) + '...';
                return textOk
            },
            getFlag(value) {
                let lang = '';
                
                if(value.original_language) {

                    switch (value.original_language) {
                        case 'ja':
                            lang = 'jp'
                            break;
    
                        case 'en':
                            lang = 'gb'   
                            break; 

                        case 'ko':
                            lang = 'kr'   
                            break; 
                    
                        default:
                            lang = (value.original_language)
                            break;
                    }
    
                    let url = lang.toUpperCase()
                    return url
                }
            },
            getStars(value) {
                let vote = Math.round((value.vote_average) / 2);
                let star = [];
                for(let i = 0; i < vote; i++) {
                    star.push({icona:'fa-solid fa-star', size:'lg'})
                }
                let voteNot = 5 - vote;
                for(let i = 0; i < voteNot; i++) {
                    star.push({icona:'fa-regular fa-star', size:'sm'})
                }
                return star 
            },
        },
    }
</script>
<template>
    <div class="card border-0">
        <img v-if="element.poster_path" :src="image(element)" :alt="title(element)">
        <div class="description" :class="!element.poster_path ? 'active' : ''">
            <h5 v-if="!element.poster_path">Image Not Available</h5>
            <div>Type: <span class="fs-6 text-capitalize">{{ type(element) }}</span></div>
            <div>Title: <span class="fs-5 fw-semibold">{{ title(element) }}</span></div>
            <div v-if="element.original_name != element.name || element.original_title != element.title">Original title: <span class="fs-6 fw-semibold">{{ original_title(element) }}</span></div>
            <div v-if="element.overview"><span class="text-decoration-underline">Description:</span> <span>{{ description(element) }}</span></div>
            <div>Language: <img :src="`https://flagsapi.com/${getFlag(element)}/shiny/64.png`" :alt="element.original_language"></div>
            <div class="d-flex">
                <div class="align-text-bottom me-2">Vote:</div>
                <div class="stars d-flex align-items-end text-warning">
                    <div class="d-flex align-items-end me-1" v-for="(value, index) in getStars(element)" :key="index"><font-awesome-icon :icon="value.icona" :size="value.size"/></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @use '../styles/partials/variables' as *;

    .card {
        width: 300px;
        height: 500px;
        overflow: hidden;
        position: relative;
        transition: 0.4s ease-out;
        box-shadow: 0px 0px 10px black;

        img {
            height: 100%;
        }

        .description {
            position: absolute;
            opacity: 0;
            padding: 20px;
            background-color: #000000c2;
            width: 100%;
            height: 100%;
            color: $color-white;
            transition: 0.4s ease-out;

            span {
                text-shadow: 1px 1px 5px black;
            }
        }

        .description.active {
            opacity: 1;
        }

        &:hover {
            transform: translateY(-30px);
        }

        &:hover .description {
            opacity: 1;
        }
    }
</style>