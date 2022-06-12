import {FilterType} from '../utils/const.js';

const filter = {
  [FilterType.WATCHLIST]: (films) => films.filter((film) => {
    if (film.userDetails) {
      return film.userDetails.watchlist;
    }
  }),
  [FilterType.HISTORY]: (films) => films.filter((film) => {
    if (film.userDetails) {
      return film.userDetails.alreadyWatched;
    }
  }),
  [FilterType.FAVORITES]: (films) => films.filter((film) => {
    if (film.userDetails) {
      return film.userDetails.favorite;
    }
  })
};

export {filter};
