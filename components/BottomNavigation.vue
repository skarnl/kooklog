<template>
  <v-bottom-navigation app fixed grow color="primary">
    <v-btn value="home" to="/week">
      <v-icon>mdi-playlist-edit</v-icon>
    </v-btn>

    <v-btn value="recent" to="/list">
      <v-icon>mdi-filter-variant</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="search" @click="openAddEntryDialog">
      <v-icon>mdi-magnify</v-icon>
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
