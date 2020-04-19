<template>
  <v-app dark>
    <v-app-bar app dense flat short tile>
      <v-spacer />
      <span class="overline">v1.0.0-alpha.1</span>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />

        <EntryModal />
      </v-container>
    </v-content>
    <BottomNavigation />
  </v-app>
</template>

<script>
import BottomNavigation from '../components/BottomNavigation'
import EntryModal from '../components/EntryModal'

export default {
  components: { EntryModal, BottomNavigation },
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'List',
          to: '/list'
        }
      ],
      title: 'Kooklog'
    }
  }
}
</script>
