import { DateTime } from 'luxon';

export interface Entry {
  date: string;
  dishId: number;
}

export const makeEntry = (date: DateTime, dishId: number): Entry => ({
  date: date.toISODate(),
  dishId,
});
