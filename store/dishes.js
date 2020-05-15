export const TAG_KIND__PASTA = 'tag_kind__pasta';
export const TAG_KIND__RICE = 'tag_kind__rice';
export const TAG_KIND__POTATO = 'tag_kind__potato';

export const TAG_PROTEIN__MEAT = 'tag_protein__meat';
export const TAG_PROTEIN__FISH = 'tag_protein__fish';
export const TAG_PROTEIN__VEGI = 'tag_protein__vegi';

export const state = () => ({
  dishes: [
    {
      id: 0, // just the Date.now when it was created? or something different? are we gonna just index it? or maybe uuid it?
      name: 'Pannenkoeken met spek',
      tags: [TAG_KIND__PASTA, TAG_KIND__RICE],
    },
    {
      id: 1, // just the Date.now when it was created? or something different? are we gonna just index it? or maybe uuid it?
      name: 'Brocolli',
    },
    {
      id: 2, // just the Date.now when it was created? or something different? are we gonna just index it? or maybe uuid it?
      name: 'Lasagna',
    },
  ],
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
