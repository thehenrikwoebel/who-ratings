<template>
    <Header></Header>
    <v-main>
        <v-card-title class="text-h6 text-md-h5 text-lg-h4 text-center">New Who</v-card-title>
        <v-container title="New Who">
            <EpisodeCard :classic="false" :episode="episodes[index]" :title="episodes_titles[index]" :description="episodes_descriptions[index]" :heart="episodes_hearts[index]" v-for="(item, index) in episodes_titles" v-bind:key="item.id"></EpisodeCard>
        </v-container>
        <v-divider></v-divider>
        <v-card-title class="text-h6 text-md-h5 text-lg-h4 text-center">Classic Who</v-card-title>
        <v-container title="Classic Who">
            <EpisodeCard :classic="true" :episode="episodes_classic[index]" :title="episodes_classic_titles[index]" :description="episodes_classic_descriptions[index]" :heart="episodes_classic_hearts[index]" v-for="(item, index) in episodes_classic_titles" v-bind:key="item.id"></EpisodeCard>
        </v-container>
    </v-main>
</template>

<script>
import Header from '../components/Header-Component.vue';
import EpisodeCard from '../components/Episode-Card.vue';
    export default {
        name: 'Hearts-View',
        data: () => ({
            episodes_titles: [],
            episodes_descriptions: [],
            episodes_hearts: [],
            episodes: [],
            episodes_classic_titles: [],
            episodes_classic_descriptions: [],
            episodes_classic_hearts: [],
            episodes_classic: [],
            async fetchEpisodes() {
                let request = await fetch("/api/db/getNewWhoHearts"); //requests a list of all new Who episodes
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
                }
            },
            async fetchClassicEpisodes() {
                let request = await fetch("/api/db/getClassicsHearts"); //requests a list of all classic episodes
                this.episodes_classic_titles = [];
                this.episodes_classic_descriptions = [];
                this.episodes_classic_hearts = [];
                this.episodes_classic = [];
                let eps = await request.json();
                for(let i = 0; i < eps.length;i++) { 
                    this.episodes_classic_titles[i] = eps[i].text; //fills variable episodes_titles with all classic episode titles
                    this.episodes_classic_descriptions[i] = eps[i].description; //fills variable episodes_descriptions with all classic episode descriptions
                    this.episodes_classic_hearts[i] = eps[i].heart; //fills variable episodes_hearts with all classic episode hearts ;)
                    this.episodes_classic[i] = eps[i].episode; //fills Array episodes with all classic episode numbers
                }
            }
        }),
        components: {
            Header,
            EpisodeCard,
        },
        mounted() {
            this.fetchEpisodes();
            this.fetchClassicEpisodes();
        }
    }
</script>