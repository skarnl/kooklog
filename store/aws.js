const SET_ACCESS_KEY = 'SET_ACCESS_KEY';
const SET_SECRET_KEY = 'SET_SECRET_KEY';
const LOCAL_ACCESS_KEY = 'local_access_key';
const LOCAL_SECRET_KEY = 'local_secret_key';

export const state = () => ({
  accessKey: '',
  secretKey: '',
});

export const mutations = {
  [SET_ACCESS_KEY](state, key) {
    state.accessKey = key;
  },
  [SET_SECRET_KEY](state, key) {
    state.secretKey = key;
  },
};

export const actions = {
  fetchInitialStore({ commit }) {
    if (process.client) {
      const localAccessKey = window.localStorage.getItem(LOCAL_ACCESS_KEY);
      const localSecretKey = window.localStorage.getItem(LOCAL_SECRET_KEY);

      if (localAccessKey) {
        commit(SET_ACCESS_KEY, localAccessKey);
      }

      if (localSecretKey) {
        commit(SET_SECRET_KEY, localSecretKey);
      }
    }
  },
  setKeys({ commit }, { accessKey, secretKey }) {
    window.localStorage.setItem(LOCAL_ACCESS_KEY, accessKey);
    window.localStorage.setItem(LOCAL_SECRET_KEY, secretKey);

    commit(SET_ACCESS_KEY, accessKey);
    commit(SET_SECRET_KEY, secretKey);
  },
};

export const getters = {
  isAuthenticated: state => !!state.accessKey && !!state.secretKey,
};
