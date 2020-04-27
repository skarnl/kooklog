export const state = () => ({
  lastMutationDate: '',
  entries: [
    {
      name: 'Rijst met kipkerrie',
      date: Date.parse('16 April 2020'),
    },
    {
      name: 'Pannenkoeken',
      date: Date.parse('17 April 2020'),
    },
    {
      name: 'Groentensoep',
      date: Date.parse('18 April 2020'),
    },
    {
      name: 'Gebakken aardappeltjes + kip (ala oma)',
      date: Date.parse('19 April 2020'),
    },
    {
      name: 'Pasta ala Tobias',
      date: Date.parse('15 April 2020'),
    },
    {
      name: 'Patat',
      date: Date.parse('14 April 2020'),
    },
  ],
});

export const mutations = {
  ADD_ENTRY(state, entry) {
    state.entries.push(entry);
  },
  DELETE_ENTRY(state, { entry }) {
    state.list.splice(state.entries.indexOf(entry), 1);
  },
  SET_ENTRIES(state, entries) {
    state.entries = [...entries];
  },
};

export const actions = {
  async fetchInitialStore({ commit }) {
    console.log('commit : ', commit);

    console.log('nuxtServerInit');
    //
    const { data } = await this.$axios.get('http://swapi.dev/api/starships/');
    const entries = data.results.map(result => ({
      name: result.name,
      date: Date.parse(result.created),
    }));

    console.log('entries : ', entries);

    commit('SET_ENTRIES', entries);
  },
  addEntry({ commit }, { name, date }) {
    commit('ADD_ENTRY', {
      name,
      date: Date.parse(date),
    });
  },
  // deleteEntry()
};

export const getters = {
  sortedEntries: state => state.entries.slice().sort((a, b) => b.date - a.date),
};
