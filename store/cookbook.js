import * as R from 'ramda';

export const TAG_KIND__PASTA = 'tag_kind__pasta';
export const TAG_KIND__RICE = 'tag_kind__rice';
export const TAG_KIND__POTATO = 'tag_kind__potato';

export const TAG_PROTEIN__MEAT = 'tag_protein__meat';
export const TAG_PROTEIN__FISH = 'tag_protein__fish';
export const TAG_PROTEIN__VEGI = 'tag_protein__vegi';

let idIndex = 0;

const addIdToEntry = entry => ({
  ...entry,
  id: idIndex++,
});

export const fixedStartDishes = R.map(addIdToEntry, [
  {
    name: 'Pannenkoeken met spek',
    tags: [],
  },
  {
    name: 'Brocolli',
    tags: [TAG_KIND__POTATO, TAG_PROTEIN__MEAT],
  },
  {
    name: 'Lasagna',
    tags: [TAG_KIND__PASTA, TAG_PROTEIN__MEAT],
  },
  {
    name: 'Patat met frietsaus',
    tags: [TAG_PROTEIN__MEAT],
  },
  {
    name: 'Poffertjes',
    tags: [],
  },
  {
    name: 'Kipkerrie met rijst',
    tags: [TAG_KIND__RICE, TAG_PROTEIN__MEAT],
  },
  {
    name: 'Aubergine-rolletjes',
    tags: [TAG_KIND__RICE, TAG_PROTEIN__VEGI],
  },
  {
    name: 'Parpadelle met chipolata-worstjes',
    tags: [TAG_KIND__PASTA, TAG_PROTEIN__MEAT],
  },
  {
    name: 'Paprikasoep',
    tags: [TAG_PROTEIN__VEGI],
  },
  {
    name: 'Ovenpatat met snacks',
    tags: [TAG_KIND__POTATO, TAG_PROTEIN__MEAT],
  },
  {
    name: 'Zelfgemaakte pizza',
    tags: [TAG_KIND__PASTA, TAG_PROTEIN__MEAT],
  },
  {
    name: 'Pizza (afhaal)',
    tags: [TAG_KIND__PASTA, TAG_PROTEIN__MEAT],
  },
  {
    name: 'Aardappels met bloemkool',
    tags: [TAG_KIND__POTATO, TAG_PROTEIN__MEAT],
  },
  {
    name: "Taco's",
    tags: [TAG_PROTEIN__MEAT],
  },
]);

export const state = () => ({
  dishes: [...fixedStartDishes],
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
  addDish(state, { dish }) {},
  // removeDish
};

export const actions = {};

export const getters = {
  getDishById: state => dishId =>
    // TODO: if performance is an issue, replace this with for-loop ^^
    state.dishes.find(entry => entry.id === dishId),
};
