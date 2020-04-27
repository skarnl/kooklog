const ADD_ENTRY = 'ADD_ENTRY';
const DELETE_ENTRY = 'DELETE_ENTRY';
const SET_ENTRIES = 'SET_ENTRIES';
const SET_LAST_MUTATION_DATE = 'SET_LAST_MUTATION_DATE';

export const state = () => ({
  lastMutationDate: '',
  entries: [],
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
};

export const actions = {
  async fetchInitialStore({ commit }) {
    const { data } = await this.$axios.get(
      'https://rakso-kooklog-store.s3.eu-west-2.amazonaws.com/kooklog-store.json',
    );

    commit(SET_ENTRIES, data.entries);
    commit(SET_LAST_MUTATION_DATE, data.lastMutationDate);
  },
  addEntry({ commit }, { name, date }) {
    commit(ADD_ENTRY, {
      name,
      date: Date.parse(date),
    });
  },
  // deleteEntry()
};

export const getters = {
  sortedEntries: state => state.entries.slice().sort((a, b) => b.date - a.date),
};
