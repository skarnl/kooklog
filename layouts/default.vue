<template>
  <v-app dark>
    <v-app-bar app dense flat short tile>
      <v-spacer />
      <span class="overline">v1.0.0-beta.1</span>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
        <v-overlay :value="loading" color="#bdbdbd">
          <div class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
              size="48"
              width="6"
            ></v-progress-circular>
          </div>
        </v-overlay>
        <AuthModal :show-dialog="!isAuthenticated" />
      </v-container>
    </v-content>
    <BottomNavigation />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import BottomNavigation from '../components/BottomNavigation';
import AuthModal from '../components/AuthModal';

export default {
  components: { BottomNavigation, AuthModal },
  data() {
    return {
      title: 'Kooklog',
    };
  },
  computed: {
    ...mapState('app', {
      loading: state => state.loading,
    }),
    ...mapGetters({
      isAuthenticated: 'aws/isAuthenticated',
    }),
  },
};
</script>
