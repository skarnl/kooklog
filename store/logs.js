import { DateTime } from 'luxon';
import { fixedStartDishes } from './dishes';

const DELETE_ENTRY = 'DELETE_ENTRY';
const SET_ENTRIES = 'SET_ENTRIES';
const SET_LAST_MUTATION_DATE = 'SET_LAST_MUTATION_DATE';
const LOADING = 'LOADING';
const SET_ERROR = 'SET_ERROR';

export const state = () => ({
  lastMutationDate: '',
  entries: [],
  loading: false,
  error: false,
  errorMessage: '',
});

export const mutations = {
  [DELETE_ENTRY](state, { entry }) {
    state.list.splice(state.entries.indexOf(entry), 1);
  },
  [SET_ENTRIES](state, entries) {
    state.entries = [...entries];
  },
  [SET_LAST_MUTATION_DATE](state, lastMutationDate) {
    state.lastMutationDate = lastMutationDate;
  },
  [LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_ERROR](state, errorMessage) {
    state.error = true;
    state.errorMessage = errorMessage;
  },
};

/**
 * FILL THE LOGS WITH FAKE ENTRIES (for easier testing)
 */

const getRandomDish = () =>
  fixedStartDishes[Math.floor(Math.random() * fixedStartDishes.length)];

const fakeEntries = [];

const createFakeEntry = day => {
  return {
    id: Date.now() + Math.random() * 10000,
    dishId: getRandomDish().id,
    date: day.toMillis(),
  };
};

const today = DateTime.local();
for (let i = 0; i < 100; i++) {
  fakeEntries.push(createFakeEntry(today.minus({ day: i })));
}

/**
 * END OF FAKE FILLING THE LOGS
 */

export const actions = {
  // eslint-disable-next-line require-await
  async fetchInitialStore({ commit }, { app }) {
    // const data = await app.$aws.fetch();
    const data = { entries: [...fakeEntries], lastMutationDate: Date.now() };

    if (data && data.entries) {
      commit(SET_ENTRIES, data.entries);
      commit(SET_LAST_MUTATION_DATE, data.lastMutationDate);
    }
  },
  async addEntry({ commit, state }, { name, date }) {
    commit(LOADING, true);

    try {
      const newStore = await this.$aws.sync({
        id: Date.now(),
        name,
        date: Date.parse(date),
      });

      commit(SET_ENTRIES, newStore.entries);
      commit(SET_LAST_MUTATION_DATE, newStore.lastMutationDate);
    } catch (e) {
      console.error(e);

      commit(SET_ERROR, e.message);
    } finally {
      commit(LOADING, false);
    }
  },
  // deleteEntry()
};

const formatDate = date =>
  new Date(date).toLocaleString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

export const getters = {
  formattedEntries: (state, getters, rootState, rootGetters) =>
    state.entries.map(entry => ({
      ...entry,
      displayName: rootGetters['dishes/getDishById'](entry.dishId).name,
      formattedDate: formatDate(entry.date),
    })),

  sortedEntries: (state, getters) =>
    getters.formattedEntries.slice().sort((a, b) => b.date - a.date),

  lastWeekEntries: (state, getters) => getters.sortedEntries.slice(0, 10),
};
