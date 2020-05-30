/**
 * This file is only used because the modular-setup of the Vuex-store
 * doesn't support the nuxtServerInit
 *
 * It's only called in the root-store (store/index.js),
 * so we need to pass this through to the modular-stores
 */
import { ActionTree } from 'vuex';
import { LogsState } from '~/store/logs';
import { CookbookState } from '~/store/cookbook';

export type RootState = {
  app: any;
  aws: any;
  logs: LogsState;
  cookbook: CookbookState;
};

export const actions: ActionTree<RootState, RootState> = {
  async nuxtClientInit({ dispatch }, { app }) {
    await dispatch('aws/fetchLocalStoredCredentials');
    await app.$aws.sync();
  },
};
