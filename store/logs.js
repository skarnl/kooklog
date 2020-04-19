export const state = () => ({
  entries: []
})

export const mutations = {
  ADD_ENTRY(state, entry) {
    state.entries.push(entry)
  },
  DELETE_ENTRY(state, { entry }) {
    state.list.splice(state.entries.indexOf(entry), 1)
  },
  SET_ENTRIES(state, entries) {
    state.entries = { ...entries }
  }
}

export const actions = {
  addEntry({ commit }, payload) {
    commit('ADD_ENTRY', payload)
  }
  // deleteEntry()
}

export const getters = {
  allEntries: (state) => state.entries
}
