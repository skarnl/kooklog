<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <template v-for="(item, index) in weekEntries">
          <v-list-item :key="index">
            <v-row @click.stop="openEditEntryDialog(item)">
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
                <template v-if="item.entry">
                  {{ item.entry.dish.name }}
                </template>

                <!-- TOODOOOOOOO  iets van styling doen -->
                <!-- TOODOOOOOOO  iets van styling doen -->
                <!-- TOODOOOOOOO  iets van styling doen -->
                <!-- TOODOOOOOOO  iets van styling doen -->
                <!-- TOODOOOOOOO  iets van styling doen -->
                <!-- TOODOOOOOOO  iets van styling doen -->

                <template v-else>
                  Klik om iets toe te voegen
                </template>
              </v-col>
            </v-row>
          </v-list-item>

          <v-divider
            v-if="index + 1 < weekEntries.length"
            :key="item.id"
            inset
          />
        </template>
      </v-col>
    </v-row>
    <EntryModal
      :show="showEntryModal"
      :entry="selectedEntry"
      :day="selectedDay"
      @close="closeEditEntryDialog"
    />
  </div>
</template>

<script>
import { DateTime } from 'luxon';
import EntryModal from '../components/EntryModal';

export default {
  name: 'Week',
  components: { EntryModal },
  data: () => ({
    today: DateTime.local(),
    showEntryModal: false,
    selectedEntry: null,
    selectedDay: null,
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
  created() {
    // if we are looking at this before the next morning
    // we assume we haven't slept yet and still think today is yesterday ^^
    if (this.today.hour <= 5) {
      this.today = this.today.minus({ day: 1 });
    }
  },
  methods: {
    formatDay(day) {
      return day
        .setLocale('nl-nl')
        .toLocaleString({ weekday: 'short' })
        .toUpperCase();
    },
    openEditEntryDialog({ entry, day }) {
      this.selectedEntry = entry;
      this.selectedDay = day;
      this.showEntryModal = true;
    },
    closeEditEntryDialog() {
      this.selectedDay = null;
      this.showEntryModal = false;
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
