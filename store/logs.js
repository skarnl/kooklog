import { uploadStore } from '../api/updateRemoteStore';

const ADD_ENTRY = 'ADD_ENTRY';
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
  [ADD_ENTRY](state, entry) {
    state.entries.push(entry);
  },
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
  async fetchInitialStore({ commit }) {
    const { data } = await this.$axios.get(
      'https://rakso-kooklog-store.s3.eu-west-2.amazonaws.com/kooklog-store.json',
    );

    commit(SET_ENTRIES, data.entries);
    commit(SET_LAST_MUTATION_DATE, data.lastMutationDate);
  },
  async addEntry({ commit, state }, { name, date }) {
    commit(LOADING, true);

    try {
      const result = await uploadStore(state);
      console.log('result : ', result);

      commit(ADD_ENTRY, {
        name,
        date: Date.parse(date),
      });
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
