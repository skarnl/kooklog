import { DateTime } from 'luxon';

export interface Entry {
  date: string;
  dishId: number;
  notes: string;
}

export const makeEntry = (
  date: DateTime,
  dishId: number,
  notes: string = '',
): Entry => ({
  date: date.toISODate(),
  dishId,
  notes,
});
