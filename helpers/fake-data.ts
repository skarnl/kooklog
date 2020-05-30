import * as R from 'ramda';
import { DateTime } from 'luxon';

import { Dish } from '../store/cookbook';
import { makeEntry } from './entry';

const getRandomDish = () =>
  fixedSetOfDishes[Math.floor(Math.random() * fixedSetOfDishes.length)];

const createFakeEntry = (day: DateTime) => makeEntry(day, getRandomDish().id);

export const createInitialEntries = () => {
  const fakeEntries = [];
  const today = DateTime.local();

  for (let i = 0; i < 100; i++) {
    fakeEntries.push(createFakeEntry(today.minus({ day: i })));
  }

  return fakeEntries;
};

let idIndex = 0;

const decorateDish = (name: string) => ({
  id: idIndex++,
  name,
  tags: [],
});

const fixedSetOfDishes: Dish[] = R.map(decorateDish, [
  'Pannenkoeken',
  'Brocolli',
  'Patat en snacks uit de oven',
  'Kipkerrie met rijst',
  'Aubergine-rolletjes uit de oven',
  'Parpadelle met chipolata-worstjes',
  'Ovenpatat met snacks',
  'Zelfgemaakte pizza',
  'Pizza (Dominos)',
  'Pizza (diepvries)',
  "Taco's",
  'Marokaanse gehaktballetjes',
  'Nasi',
  'Andijviestampot',
  'Zuurkool',
  'Burittos',
  'Wraps',
  'Pasta ala Tobias',
  'Pasta ala Renske (spinazie)',
  'Roomprutje met rijst',
  'Spaghetti',
  'Macaroni',
  'Witlof ham & kaas',
  'Lasagne',
  'Tomatensoep',
  'Pastasalade',
  'Gebakken aardappels',
  'Spaghetti met pestoballetjes',
  'Boerenkool',
  'Rode kool met aardappels',
  "Noedels, snijbonen en honingpinda's",
  'Gebakken aardappels, vis en doperwtjes/wortels',
  'Gebakken aardappels, kip en sla',
  'BBQ',
  'Shoarma',
  'Chili con carne',
  'Bietensalade',
]);

export const getFixedSetOfDishes = () => fixedSetOfDishes;
