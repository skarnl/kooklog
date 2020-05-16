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
    // await this.fetchInitialStore({ commit, dispatch }, { app });
  },

  async fetchInitialStore({ commit, dispatch }, { app }) {
    const data = await app.$aws.fetch();

    if (data) {
      if (data.entries) {
        dispatch('logs/setEntries', data.entries);
      }
      if (data.dishes) {
        dispatch('cookbook/setDishes', data.dishes);
      }
    }
  },
};
