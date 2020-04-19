<template>
  <v-row>
    <v-col cols="12" sm="12" md="6">
      <v-card max-width="600" class="mx-auto">
        <v-list two-line subheader>
          <v-list-item
            v-for="entry in entries"
            :key="entry.title"
            @click="clickHandler"
          >
            <v-list-item-avatar>
              <v-icon :class="[entry.iconClass]" v-text="entry.icon"></v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="entry.title"></v-list-item-title>
              <v-list-item-subtitle v-text="entry.date"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'List',
  methods: {
    clickHandler() {
      // eslint-disable-next-line no-console
      console.log('click op item')
    }
  },
  computed: mapGetters(['allEntries'])
}
</script>
