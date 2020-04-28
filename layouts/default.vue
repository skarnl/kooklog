<template>
  <v-app dark>
    <v-app-bar app dense flat short tile>
      <v-spacer />
      <span class="overline">v1.0.0-beta.1</span>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
        <EntryModal />
        <AuthModal :show-dialog="!showAuthModule" />
      </v-container>
    </v-content>
    <BottomNavigation />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

import BottomNavigation from '../components/BottomNavigation';
import EntryModal from '../components/EntryModal';
import AuthModal from '../components/AuthModal';

export default {
  components: { EntryModal, BottomNavigation, AuthModal },
  data() {
    return {
      title: 'Kooklog',
    };
  },
  computed: {
    ...mapGetters({
      showAuthModule: 'aws/isAuthenticated',
    }),
  },
};
</script>
