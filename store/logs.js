// import { uploadStore } from '../api/updateRemoteStore';

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

export const actions = {
  async fetchInitialStore({ commit }, { app }) {
    const data = await app.$aws.fetch();

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

export const getters = {
  sortedEntries: state => state.entries.slice().sort((a, b) => b.date - a.date),
};
