// import { uploadStore } from '../api/updateRemoteStore';

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
  async fetchInitialStore({ commit }, { app }) {
    const data = await app.$aws.fetch();

    if (data && data.entries) {
      commit(SET_ENTRIES, data.entries);
      commit(SET_LAST_MUTATION_DATE, data.lastMutationDate);
    }
  },
  async addEntry({ commit, state, rootState }, { name, date }) {
    commit(LOADING, true);

    const awsStore = rootState.aws;

    if (!awsStore.accessKey || !awsStore.secretKey) {
      return;
    }

    const newEntry = {
      name,
      date,
    };

    try {
      await uploadStore(
        {
          entries: [...state.entries, newEntry],
          lastMutationDate: Date.now(),
        },
        {
          accessKey: awsStore.accessKey,
          secretKey: awsStore.secretKey,
        },
      );
      commit(ADD_ENTRY, newEntry);
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
