import { DateTime } from 'luxon';
import { fixedStartDishes } from '../store/cookbook';

const getRandomDish = () =>
  fixedStartDishes[Math.floor(Math.random() * fixedStartDishes.length)];

const createFakeEntry = day => {
  return {
    id: Date.now() + Math.random() * 10000,
    dishId: getRandomDish().id,
    date: day.toMillis(),
  };
};

export const createFakeEntries = () => {
  const fakeEntries = [];
  const today = DateTime.local();

  for (let i = 0; i < 100; i++) {
    fakeEntries.push(createFakeEntry(today.minus({ day: i })));
  }

  return fakeEntries;
};
