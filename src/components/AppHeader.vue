<script>
    export default {
        props: {
            element: Array,
        },
        emits: [
            'searching',
            'selecting',
        ],
        data() {
            return {
                newSearch: '',
                selected: '',
            }
        },
        methods: {
            clickSearch() {
                if(this.newSearch != '' && this.newSearch.replace(/\s/g, '').length != 0) {
                    this.$emit('searching', this.newSearch);
                    this.newSearch = '';
                    this.selected = '';
                }
                else {
                    this.newSearch = ''
                }
            },
            changeSelect() {
                this.$emit('selecting', this.selected);
            }
        }
    }
</script>

<template>
    <header>
        <div class="container-fluid">
            <div class="row justify-content-between">
                <div class="col-6 d-flex align-items-center">
                    <div class="mycard fs-3 fw-bold">
                        <img src="../assets/Netflix_Logo_PMS.png" alt="Logo Netflix">
                    </div>
                </div>
                <div class="col-6 d-flex align-items-center">
                    <div class="card flex-row align-items-center justify-content-end w-100 border-0">
                        <div class="me-5">
                            <select @change="changeSelect()" class="select" name="select-type" id="select-type" v-model="selected">
                                <option value="" disabled selected>Select your genre</option>
                                <option v-for="(value, index) in element" :key="index" :value="value.id">{{ value.name }}</option>
                            </select>
                        </div>
                        <div>
                            <button @click="clickSearch()" class="buttonSearch"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
                            <input @keyup.enter="clickSearch()" class="input-search" placeholder="type the title you want to search" type="text" v-model="newSearch">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
    @use '../styles/partials/variables.scss'as *;

    header {
        background-color: $bg-black;
        padding: 0 20px;

        img {
            width: 200px;
            margin-left: -20px;
        }

        .card {
            background-color: transparent;

            .select {
                padding: 7px 10px;
                border-radius: 5px;
                outline: none;

                &:focus-visible {
                    box-shadow: 0px 0px 3px 5px lightblue;
                }
            }

            .buttonSearch {
                margin-right: 0.75rem;
                padding: 4px 10px;
                border-radius: 8px;
                background-color: transparent;
                color: $color-white;
                font-weight: 900;
                font-size: 18px;
                border: 3px solid black;

                &:hover {
                    box-shadow: 0px 0px 3px 5px lightblue;
                }

                &:active {
                    background-color: $bg-white;
                    color: black;
                }
            }

            .input-search{
                --webkit-appearance-: none;
                border: none;
                border-radius: 5px;
                background-color: white;
                padding: 7px 10px;
                width: 300px;

                &:focus-visible {
                    outline: none;
                    box-shadow: 0px 0px 3px 5px lightblue;
                }
            }
        }
    }
    
</style>