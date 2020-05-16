import * as R from 'ramda';

export const TAG_KIND__PASTA = 'tag_kind__pasta';
export const TAG_KIND__RICE = 'tag_kind__rice';
export const TAG_KIND__POTATO = 'tag_kind__potato';

export const TAG_PROTEIN__MEAT = 'tag_protein__meat';
export const TAG_PROTEIN__FISH = 'tag_protein__fish';
export const TAG_PROTEIN__VEGI = 'tag_protein__vegi';

const SET_DISHES = 'SET_DISHES';
const ADD_DISH = 'ADD_DISH';

export const state = () => ({
  dishes: [],
  tags: {
    kind: [
      {
        id: TAG_KIND__PASTA,
        name: 'Pasta',
      },
      {
        id: TAG_KIND__RICE,
        name: 'Rijst',
      },
      {
        id: TAG_KIND__POTATO,
        name: 'Aardappels',
      },
    ],
    protein: [
      {
        id: TAG_PROTEIN__MEAT,
        name: 'Vlees',
      },
      {
        id: TAG_PROTEIN__FISH,
        name: 'Vis',
      },
      {
        id: TAG_PROTEIN__VEGI,
        name: 'Vegetarisch',
      },
    ],
  },
});

export const mutations = {
  [SET_DISHES](state, dishes) {
    state.dishes = [...dishes];
  },
  [ADD_DISH](state, newDish) {
    state.dishes = [...state.dishes, newDish];
  },
};

export const actions = {
  setDishes({ commit, state }, dishes) {
    commit(SET_DISHES, dishes);
  },

  addDish({ commit, state, dispatch }, { dishName }) {
    const id = R.last(state.dishes).id + 1;
    const dish = { id, name: dishName };

    commit(ADD_DISH, dish);

    return dish;
  },
};

export const getters = {
  getDishById: state => dishId =>
    // TODO: if performance is an issue, replace this with for-loop ^^
    state.dishes.find(entry => entry.id === dishId),
};
