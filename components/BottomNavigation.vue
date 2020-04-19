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
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'BottomNavigation'
}
</script>

<style scoped lang="scss"></style>
