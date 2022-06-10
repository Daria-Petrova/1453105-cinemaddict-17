import {FilterType} from '../utils/const.js';

const filter = {
  [FilterType.WATCHLIST]: (films) => films.filter((task) => task),
  [FilterType.HISTORY]: (films) => films.filter((task) => task),
  [FilterType.FAVORITES]: (films) => films.filter((task) => task)
};

export {filter};
