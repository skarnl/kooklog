export const LOADING = 'LOADING';

export const state = () => ({
  loading: false,
});

export const mutations = {
  [LOADING](state, { loading }) {
    state.loading = loading;
  },
};

export const actions = {
  loading({ commit }, loading) {
    commit(LOADING, { loading });
  },
};
