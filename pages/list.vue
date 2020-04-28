<template>
  <v-row>
    <v-col cols="12" sm="12" md="6">
      <v-card max-width="600" class="mx-auto">
        <template v-if="sortedEntries.length">
          <v-list two-line subheader>
            <v-list-item
              v-for="entry in sortedEntries"
              :key="entry.title"
              @click="clickHandler"
            >
              <v-list-item-avatar>
                <v-icon :class="[entry.iconClass]" v-text="entry.icon" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="entry.name" />
                <v-list-item-subtitle v-text="formatDate(entry.date)" />
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </template>
        <v-list-item v-else>
          <v-list-item-content>
            <v-list-item-title>Nog niks in de lijst</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'List',
  computed: {
    ...mapGetters('logs', ['sortedEntries']),
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString('nl-NL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    clickHandler() {
      // eslint-disable-next-line no-console
      console.log('click op item');
    },
  },
};
</script>
