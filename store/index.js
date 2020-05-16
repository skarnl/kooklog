/**
 * This file is only used because the modular-setup of the Vuex-store
 * doesn't support the nuxtServerInit
 *
 * It's only called in the root-store (store/index.js),
 * so we need to pass this through to the modular-stores
 */

export const actions = {
  async nuxtClientInit({ commit, dispatch }, { app }) {
    await dispatch('aws/fetchInitialStore');
    await dispatch('fetchInitialStore', { app });
  },

  async fetchInitialStore(_, { app }) {
    await app.$aws.sync();
  },
};
