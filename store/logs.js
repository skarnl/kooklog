import * as R from 'ramda';
import { DateTime } from 'luxon';
import { makeEntry } from '../helpers/entry';

const SET_ENTRIES = 'SET_ENTRIES';

export const state = () => ({
  entries: [],
});

export const mutations = {
  [SET_ENTRIES](state, entries) {
    state.entries = [...entries];
  },
};

const wait = timeInMillisecs =>
  new Promise(resolve => setTimeout(resolve, timeInMillisecs));

export const actions = {
  setEntries({ commit }, entries) {
    commit(SET_ENTRIES, entries);
  },

  async addOrUpdateEntry({ commit, state, dispatch }, { dish, date }) {
    dispatch('app/loading', true, { root: true });

    try {
      await this.$aws.sync();

      let dishToAdd = dish;

      if (typeof dish === 'string') {
        dishToAdd = dispatch(
          'cookbook/addDish',
          { dishName: dish },
          { root: true },
        );
      }

      const newEntry = makeEntry(date, dishToAdd.id);

      const existingEntryIndex = R.findIndex(R.propEq('date', newEntry.date))(
        state.entries,
      );

      let entries = [...state.entries];

      if (existingEntryIndex !== -1) {
        entries = entries.splice(existingEntryIndex, 1, newEntry);
      } else {
        entries = [...entries, newEntry];
      }

      dispatch('logs/setEntries', entries);

      await Promise.all([this.$aws.upload(), wait(3000)]);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch('app/loading', false, { root: true });
    }
  },
};

const formatDate = date =>
  DateTime.fromISO(date)
    .setLocale('nl-NL')
    .toLocaleString({
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

export const getters = {
  formattedEntries: (state, getters, rootState, rootGetters) =>
    state.entries.map(entry => ({
      ...entry,
      displayName: rootGetters['cookbook/getDishById'](entry.dishId).name,
      formattedDate: formatDate(entry.date),
    })),

  sortedEntries: (state, getters) =>
    getters.formattedEntries.slice().sort((a, b) => b.date - a.date),

  lastWeekEntries: (state, getters) => getters.sortedEntries.slice(0, 10),
};
