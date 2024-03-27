<template>
    <v-app>
      <Header></Header>
      <v-main>
        <v-container>
          <EpisodeCard :classic="true" :episode="episodes[index]" :title="episodes_titles[index]" :description="episodes_descriptions[index]" :heart="episodes_hearts[index]" v-for="(item, index) in episodes_titles" v-bind:key="item.id"></EpisodeCard>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import EpisodeCard from '../components/Episode-Card.vue';
  import Header from '../components/Header-Component.vue';
  
  export default {
    name: 'Classic-View',
  
    components: {
      EpisodeCard,
      Header
    },
    data: () => ({
      episodes_titles: [],
      episodes_descriptions: [],
      episodes_hearts: [],
      episodes: [],
      async fetchEpisodes() {
        let request = await fetch("/api/db/getClassics"); //requests a list of all classic episodes
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
      }
    }),
    mounted() { // requests a list of all classic episodes everytime the site gets loaded
      this.fetchEpisodes();
    }
  }
  </script>
  