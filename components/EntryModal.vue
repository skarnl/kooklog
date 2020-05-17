<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      max-width="600px"
      @click:outside="close"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{ formatedDay }}</span>
        </v-card-title>
        <v-card-text>
          <WeekEntry :entry="entry" @dishChanged="onDishChanged" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="close">Annuleren</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="saveHandler">Opslaan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { DateTime } from 'luxon';
import WeekEntry from './WeekEntry';

export default {
  name: 'EntryModal',
  components: { WeekEntry },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    entry: {
      type: Object,
      default: null,
    },
    day: {
      type: DateTime,
      default: null,
    },
  },
  data() {
    return {
      selectedDish: null,
    };
  },
  computed: {
    formatedDay() {
      if (this.day) {
        return this.day
          .setLocale('nl-nl')
          .toLocaleString({ weekday: 'long' })
          .toUpperCase();
      }

      return '';
    },
  },
  methods: {
    onDishChanged(selectedDish) {
      this.selectedDish = selectedDish;
    },

    saveHandler() {
      // we need a timeout, because the change event will otherwise be done after this callback
      setTimeout(() => {
        this.$store.dispatch('logs/addOrUpdateEntry', {
          dish: this.selectedDish,
          date: this.day,
        });

        this.close();
      }, 0);
    },

    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss"></style>
