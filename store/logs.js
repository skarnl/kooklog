import { createFakeEntries } from '../helpers/fake-data';

const SET_ENTRIES = 'SET_ENTRIES';

export const state = () => ({
  entries: [...createFakeEntries()],
});

export const mutations = {
  [SET_ENTRIES](state, entries) {
    state.entries = [...entries];
  },
};

export const actions = {
  setEntries({ commit }, entries) {
    commit(SET_ENTRIES, entries);
  },

  // eslint-disable-next-line require-await
  async addEntry({ commit, state, dispatch }, { dish, date }) {
    dispatch('app/loading', true);

    if (typeof dish === 'string') {
    }
  },

  // try {
  //   // const newStore = await this.$aws.sync({
  //   //   id: Date.now(),
  //   //   name,
  //   //   date: Date.parse(date),
  //   // });
  //   //
  //   // commit(SET_ENTRIES, newStore.entries);
  //   // commit(SET_LAST_MUTATION_DATE, newStore.lastMutationDate);
  // } catch (e) {
  //   console.error(e);
  //
  //   // commit(SET_ERROR, e.message);
  // } finally {
  //   dispatch('app/loading', false);
  // }
  // },
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
      displayName: rootGetters['cookbook/getDishById'](entry.dishId).name,
      formattedDate: formatDate(entry.date),
    })),

  sortedEntries: (state, getters) =>
    getters.formattedEntries.slice().sort((a, b) => b.date - a.date),

  lastWeekEntries: (state, getters) => getters.sortedEntries.slice(0, 10),
};
