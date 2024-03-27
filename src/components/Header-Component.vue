<template>
    <v-app-bar :elevation="10">
        <template v-slot:prepend>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <div class="favicon-icon">
            <img src="/favicon.svg" alt="Favicon">
          </div>
        </template>

        <v-app-bar-title>Doctor Who Ratings</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-heart" router :to="'hearts'"></v-btn>

          <v-btn icon="mdi-magnify"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>
      <v-navigation-drawer v-model="drawer" location="top" temporary width="120">
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" router :to="item.value" v-text="item.title"></v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
export default {
        name: 'Header-Component',
        data: () => ({
            drawer: false,
            group:null,
            items: [
                {
                title: 'New Who',
                value: 'new_who',
                },
                {
                title: 'Classic Who',
                value: 'classic',
                }
            ],
        }),
        watch: {
            group() {
                this.drawer = false
            }
        },
        components: {}
    }
</script>

<style scoped>
  #icon {
    width: 50px;
    height: 50px;
  }
  .favicon-icon {
  width: 40px; 
  height: 40px; 
  cursor: pointer;
  }

.favicon-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>