<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <!-- day after tomorrow -->
      <!-- tomorrow -->
      <!-- today -->

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

            <v-col cols="10">
              <template v-if="item.entry">
                {{ item.entry.name }}<br />
                ( {{ item.entry.date }} )
              </template>

              <template v-else>
                KLIK OM IETS IN TE VULLEN
              </template>
            </v-col>
          </v-row>
        </v-list-item>

        <v-divider
          v-if="index + 1 < weekEntries.length"
          :key="item.id"
        ></v-divider>
      </template>
    </v-col>
  </v-row>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: 'List',
  data: () => ({
    today: DateTime.local(),
  }),
  methods: {
    formatDay(day) {
      return day
        .setLocale('nl-nl')
        .toLocaleString({ weekday: 'short' })
        .toUpperCase();
    },
  },
  computed: {
    weekEntries() {
      console.log('this.today : ', this.today.toString());

      const dayAfterTomorrow = this.today.plus({ day: 2 });
      const latestEntries = this.$store.getters['logs/lastWeekEntries'];
      const latestEntriesMappedByDate = latestEntries.reduce(
        (totalObj, entry) =>
          totalObj.set(DateTime.fromMillis(entry.date).toISODate(), entry),
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
</style>
