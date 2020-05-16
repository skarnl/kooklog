import * as R from 'ramda';
import { DateTime } from 'luxon';
import {
  TAG_KIND__PASTA,
  TAG_KIND__POTATO,
  TAG_KIND__RICE,
  TAG_PROTEIN__MEAT,
  TAG_PROTEIN__VEGI,
} from '../store/cookbook';
import { makeEntry } from './entry';

const getRandomDish = () =>
  fakeDishes[Math.floor(Math.random() * fakeDishes.length)];

const createFakeEntry = day => makeEntry(day, getRandomDish().id);

export const createFakeEntries = () => {
  const fakeEntries = [];
  const today = DateTime.local();

  for (let i = 0; i < 100; i++) {
    fakeEntries.push(createFakeEntry(today.minus({ day: i })));
  }

  return fakeEntries;
};

let idIndex = 0;

const addIdToDish = entry => ({
  ...entry,
  id: idIndex++,
});

const fakeDishes = R.map(addIdToDish, [
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

export const getFakeDishes = () => fakeDishes;
