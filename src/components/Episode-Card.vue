<template>
    <v-card :text="description" :title="title">
        <v-card-actions>
            <v-hover>
                <v-btn :icon="heart_var ? 'mdi-heart' : 'mdi-heart-outline'" @click="heart_var = !heart_var; heartEpisode();"></v-btn>
                <v-slider @end="rateEpisode()" v-model="rating_var" :min="0" :max="10" :step="1" hide-details style="width: 250px;">
                    <template v-slot:prepend>
                        <v-btn :icon="getStar()"></v-btn>
                    </template>
                    
                    <template v-slot:append>
                        <v-text-field v-model="rating_var" density="compact" style="width: 70px;" type="number" hide-details single-line :rules="[rules.rating_rules]" @update:model-value="rateEpisode()"></v-text-field>
                    </template>
                </v-slider>
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
            rating_var: Number,
            heartEpisode() {
                if(this.classic_var) { // tests if episode is classic
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
            },
            getStar() { // decides which star gets displayed below the episodes description
                if(this.rating_var < 5) {
                    return "mdi-star-outline";
                } else if(this.rating_var < 7) {
                    return "mdi-star-half-full";
                } else if(this.rating_var >= 7 && this.rating_var < 10) {
                    return "mdi-star";
                } else if(this.rating_var === 10){
                    return "mdi-star-shooting";
                } else {
                    return "mdi-star-outline";
                }
            },
            rateEpisode() {
                if(this.classic_var) {
                    fetch("/api/db/rateClassic/" + this.episode_var + "/" + this.rating_var);
                } else {
                    fetch("/api/db/rateNewWho/" + this.episode_var + "/" + this.rating_var);
                }
            },
            rules: {
                rating_rules: value => {
                    const pattern = /^(10|[0-9])$/;
                    return pattern.test(value) || false;
                }
            }
        }),
        props: {
            title: String,
            description: String,
            heart: Boolean,
            episode: Number,
            classic: Boolean,
            rating: Number
        },
        mounted() {
            this.heart_var = this.heart;
            this.episode_var = this.episode;
            this.classic_var = this.classic;
            this.rating_var = this.rating;
        }
    }
</script>

<style scoped>
</style>