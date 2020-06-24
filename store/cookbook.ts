import * as R from 'ramda';
import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { RootState } from '~/store/index';

export const TAG_KIND__PASTA = 'tag_kind__pasta';
export const TAG_KIND__RICE = 'tag_kind__rice';
export const TAG_KIND__POTATO = 'tag_kind__potato';

export const TAG_PROTEIN__MEAT = 'tag_protein__meat';
export const TAG_PROTEIN__FISH = 'tag_protein__fish';
export const TAG_PROTEIN__VEGI = 'tag_protein__vegi';

const SET_DISHES = 'SET_DISHES';
const ADD_DISH = 'ADD_DISH';

export interface Dish {
  id: number;
  name: string;
  tags: string[];
}

interface Tag {
  id: string;
  name: string;
}

export interface CookbookState {
  dishes: Dish[];
  tags: {
    kind: Tag[];
    protein: Tag[];
  };
}

export const state = (): CookbookState => ({
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

export const mutations: MutationTree<CookbookState> = {
  [SET_DISHES](state, dishes) {
    state.dishes = [...dishes];
  },
  [ADD_DISH](state, newDish: Dish) {
    state.dishes = [...state.dishes, newDish];
  },
};

export const actions: ActionTree<CookbookState, RootState> = {
  setDishes({ commit }, dishes) {
    commit(SET_DISHES, dishes);
  },

  addDish({ commit, state }, { dishName }: { dishName: string }) {
    const lastDish = R.last(state.dishes);
    const id = lastDish ? lastDish.id + 1 : 1;
    const dish: Dish = { id, name: dishName, tags: [] };

    commit(ADD_DISH, dish);

    return dish;
  },
};

export const getters: GetterTree<CookbookState, RootState> = {
  getDishById: state => (dishId: number): Dish | undefined =>
    state.dishes.find(entry => entry.id === dishId),

  sortedDishes: state =>
    state.dishes
      .slice()
      .sort((a: Dish, b: Dish) => a.name.localeCompare(b.name)),
};
