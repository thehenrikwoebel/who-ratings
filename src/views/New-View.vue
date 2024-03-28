<template>
    <Header></Header>
    <v-main>
        <v-container>
            <v-select :items="[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,22,23,24]" v-model="season" label="Season" class="select" @change="fetchEpisodes"></v-select>
            <EpisodeCard :rating="rating[index]" :classic="false" :episode="episodes[index]" :title="episodes_titles[index]" :description="episodes_descriptions[index]" :heart="episodes_hearts[index]" v-for="(item, index) in episodes_titles" v-bind:key="item.id"></EpisodeCard>
        </v-container>
    </v-main>
</template>

<script>
import Header from '../components/Header-Component.vue';
import EpisodeCard from '@/components/Episode-Card.vue';
    export default {
        name: 'New-Who',
        data: () => ({
            episodes_titles: [],
            episodes_descriptions: [],
            episodes_hearts: [],
            episodes: [],
            season: 1,
            rating: [],
            async fetchEpisodes() {
                let request = await fetch("/api/db/getNewWho/" + this.season); //requests a list of all new Who episodes
                this.episodes_titles = [];
                this.episodes_descriptions = [];
                this.episodes_hearts = [];
                this.episodes = [];
                let eps = await request.json();
                for(let i = 0; i < eps.length;i++) { 
                    this.episodes_titles[i] = eps[i].text; //fills variable episodes_titles with all episode titles
                    this.episodes_descriptions[i] = eps[i].description; //fills variable episodes_descriptions with all episode descriptions
                    this.episodes_hearts[i] = eps[i].heart; //fills variable episodes_hearts with all episode hearts ;)
                    this.episodes[i] = eps[i].episode; //fills Array episodes with all episode numbers
                    this.rating[i] = eps[i].rating;
                }
            }
        }),
        components: {
            Header,
            EpisodeCard,
        },
        mounted() { // requests a list of all classic episodes everytime the site gets loaded
            this.fetchEpisodes();
        },
        watch: {
            season: function() {
                this.fetchEpisodes();
            }
        }
    }
</script>

<style scoped>
    .select {
        max-width: 300px;
    }
</style>