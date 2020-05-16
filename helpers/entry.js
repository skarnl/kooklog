export const makeEntry = (date, dishId) => ({
  date: date.toISODate(),
  dishId,
});
