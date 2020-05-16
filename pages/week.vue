<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <template v-for="(item, index) in weekEntries">
        <v-list-item :key="index">
          <v-row>
            <v-col
              cols="2"
              align="left"
              justify="center"
              class="day-row"
              :class="{ 'day-row--today': today.hasSame(item.day, 'day') }"
            >
              <span class="display-1  font-weight-black  day-row__title">{{
                formatDay(item.day)
              }}</span>
            </v-col>

            <v-col
              cols="10"
              class="dish"
              :class="{
                'dish--empty': !item.entry,
              }"
            >
              <WeekEntry :entry="item.entry" :day="item.day" />
            </v-col>
          </v-row>
        </v-list-item>

        <v-divider
          v-if="index + 1 < weekEntries.length"
          :key="item.id"
          inset
        ></v-divider>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { DateTime } from 'luxon';
import WeekEntry from '../components/WeekEntry';

export default {
  name: 'Week',
  components: { WeekEntry },
  data: () => ({
    today: DateTime.local(),
  }),
  computed: {
    weekEntries() {
      const dayAfterTomorrow = this.today.plus({ day: 2 });
      const latestEntries = this.$store.getters['logs/lastWeekEntries'];

      const latestEntriesMappedByDate = latestEntries.reduce(
        (totalObj, entry) => totalObj.set(entry.date, entry),
        new Map(),
      );

      const entries = [];

      for (let i = 0; i < 9; i++) {
        const day = dayAfterTomorrow.minus({ day: i });
        const weekEntry = {
          day,
          entry: null,
        };

        if (latestEntriesMappedByDate.has(day.toISODate())) {
          weekEntry.entry = latestEntriesMappedByDate.get(day.toISODate());
        }

        entries.push(weekEntry);
      }

      return entries;
    },
  },
  methods: {
    formatDay(day) {
      return day
        .setLocale('nl-nl')
        .toLocaleString({ weekday: 'short' })
        .toUpperCase();
    },
  },
};
</script>

<style scoped lang="scss">
.day-row {
  border-left: 5px solid transparent;
}

.day-row--today {
  border-left-color: var(--v-primary-base);
}

.day-row__title {
  opacity: 0.3;

  .day-row--today & {
    color: var(--v-primary-base);
    opacity: 1;
  }
}

.dish--empty {
  opacity: 0.3;
}
</style>
