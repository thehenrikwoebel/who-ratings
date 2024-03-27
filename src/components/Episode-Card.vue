<template>
    <v-card :text="description" :title="title">
        <v-card-actions>
            <v-hover>
                <v-btn :icon="heart_var ? 'mdi-heart' : 'mdi-heart-outline'" @click="heart_var = !heart_var; heartEpisode();"></v-btn>
            </v-hover>
        </v-card-actions>
    </v-card>
    <v-divider></v-divider>
</template>

<script>
    export default {
        name: 'Episode-Card',
        data: () => ({
            heart_var: false,
            episode_var: Number,
            classic_var: Boolean,
            heartEpisode() {
                if(this.classic_var) { // test if episode is classic
                    if(this.heart_var) { //tests if episode is hearted (Is true when it needs to be hearted; Check Code in line 5 ;) )
                        fetch("/api/db/heartclassics/" + this.episode_var); // hearts the episode
                    } else {
                        fetch("/api/db/unheartclassics/" + this.episode_var); // unhearts the episode
                    }   
                } else {
                    if(this.heart_var) { //tests if episode is hearted (Is true when it needs to be hearted; Check Code in line 5 ;) )
                        fetch("/api/db/heartNewWho/" + this.episode_var); // hearts the episode
                    } else {
                        fetch("/api/db/unheartNewWho/" + this.episode_var); // unhearts the episode
                    } 
                }
            }
        }),
        props: {
            title: String,
            description: String,
            heart: Boolean,
            episode: Number,
            classic: Boolean,
        },
        mounted() {
            this.heart_var = this.heart;
            this.episode_var = this.episode;
            this.classic_var = this.classic;
        }
    }
</script>

<style scoped>
</style>