<template>
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
</template>

<script>
export default {
  name: 'LogEntry',
  data: () => ({
    entries: [
      {
        icon: 'assignment',
        date: 'Jan 20, 2014',
        iconClass: 'blue white--text',
        title: 'Vacation itinerary'
      },
      {
        icon: 'call_to_action',
        date: 'Jan 10, 2014',
        iconClass: 'amber white--text',
        title: 'Kitchen remodel'
      }
    ]
  }),
  methods: {
    clickHandler() {
      // eslint-disable-next-line no-console
      console.log('click op item')
    }
  }
}
</script>

<style scoped lang="scss"></style>
