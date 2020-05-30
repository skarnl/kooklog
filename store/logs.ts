import * as R from 'ramda';
import { DateTime } from 'luxon';
import { ActionTree, GetterTree } from 'vuex';
import { makeEntry, Entry } from '../helpers/entry';
import { RootState } from '~/store/index';
import { Dish } from '~/store/cookbook';

const SET_ENTRIES = 'SET_ENTRIES';

export interface LogsState {
  entries: Entry[];
}

export const state = (): LogsState => ({
  entries: [],
});

export const mutations = {
  [SET_ENTRIES](state: LogsState, entries: Entry[]) {
    state.entries = [...entries];
  },
};

export const actions: ActionTree<LogsState, RootState> = {
  setEntries({ commit }, entries: Entry[]) {
    commit(SET_ENTRIES, entries);
  },

  async addOrUpdateEntry({ state, dispatch }, { dish, date }: CreatedEntry) {
    dispatch('app/loading', true, { root: true });

    try {
      await this.$aws.sync();

      let dishToAdd: Dish;

      if (typeof dish === 'string') {
        dishToAdd = await dispatch(
          'cookbook/addDish',
          { dishName: dish },
          { root: true },
        );
      } else {
        dishToAdd = dish;
      }

      const newEntry = makeEntry(date, dishToAdd.id);

      const existingEntryIndex = R.findIndex(R.propEq('date', newEntry.date))(
        state.entries,
      );

      let entries = [...state.entries];

      if (existingEntryIndex !== -1) {
        entries[existingEntryIndex] = newEntry;
      } else {
        entries = [...entries, newEntry];
      }

      dispatch('setEntries', entries);

      await Promise.all([this.$aws.upload(), wait(900)]);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch('app/loading', false, { root: true });
    }
  },
};

export const getters: GetterTree<LogsState, RootState> = {
  formattedEntries: (
    state,
    getters,
    rootState,
    rootGetters,
  ): FormattedEntry[] =>
    state.entries.map(entry => ({
      ...entry,
      dish: rootGetters['cookbook.ts/getDishById'](entry.dishId),
      formattedDate: formatDate(entry.date),
    })),

  sortedEntries: (state, getters) =>
    getters.formattedEntries
      .slice()
      .sort(
        (a: FormattedEntry, b: FormattedEntry) =>
          DateTime.fromISO(b.date).toMillis() -
          DateTime.fromISO(a.date).toMillis(),
      ),

  lastWeekEntries: (state, getters): FormattedEntry[] =>
    getters.sortedEntries.slice(0, 10),
};

const wait = (timeInMillisecs: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, timeInMillisecs));

export interface CreatedEntry {
  dish: string | Dish;
  date: DateTime;
}

export interface FormattedEntry extends Entry {
  dish: Dish;
  formattedDate: string;
}

const formatDate = (date: string): string =>
  DateTime.fromISO(date)
    .setLocale('nl-NL')
    .toLocaleString({
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
