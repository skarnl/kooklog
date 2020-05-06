<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-list-item-group
        v-if="sortedEntries.length"
        v-model="sortedEntries"
        multiple
        active-class="pink--text"
      >
        <template v-for="item in sortedEntries">
          <v-list-item :key="item.id">
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text
                v-text="formatDate(item.date)"
              ></v-list-item-action-text>

              <!--            IF FAVORITE (HARTJE)

                <v-icon v-if="!active" color="grey lighten-1">-->
              <!--                  star_border-->
              <!--                </v-icon>-->

              <!--                <v-icon v-else color="yellow">-->
              <!--                  star-->
              <!--                </v-icon>-->
            </v-list-item-action>
          </v-list-item>

          <v-divider
            v-if="index + 1 < sortedEntries.length"
            :key="item.id"
          ></v-divider>
        </template>
      </v-list-item-group>

      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title>Nog niks in de lijst</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
