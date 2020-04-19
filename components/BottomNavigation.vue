<template>
  <v-bottom-navigation app fixed shift grow color="primary">
    <v-btn value="home" to="/">
      <span>Over</span>
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>

    <v-btn value="recent" to="/list">
      <span>Lijst</span>
      <v-icon>mdi-format-list-bulleted</v-icon>
    </v-btn>

    <v-btn value="favorites" to="/favorites">
      <span>Favorieten</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="add" color="green" @click.stop="openAddEntryDialog">
      <span>Toevoegen</span>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { eventBus } from '../eventBus';

export default {
  name: 'BottomNavigation',
  methods: {
    openAddEntryDialog() {
      eventBus.$emit('openDialog');
    },
  },
};
</script>

<style scoped lang="scss"></style>
