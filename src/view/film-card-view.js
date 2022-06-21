import AbstractView from '../framework/view/abstract-view.js';
import { getYearfromDate, getHours, getMinutes, getShortDescription } from '../utils/utils.js';

const createFilmCardTemplate = (film) => {
  const { title, release , runtime, description, totalRating, genre, poster}  = film.filmInfo;
  const { favorite, alreadyWatched, watchlist } = film.userDetails;

  const filmTitle = title !== null? title: '';
  const filmRaiting = totalRating !== null? totalRating: '0.0';
  const filmDate = release.date !== null? getYearfromDate(release.date): '';
  const filmHour = runtime !== null? getHours(runtime): '';
  const filmMinutes = runtime !== null? getMinutes(runtime): '';
  const filmPoster = poster !== null? poster: '';
  const filmDescription = description !== null? getShortDescription(description): '';
  const filmIsFavorite = favorite? 'film-card__controls-item--active' : '';
  const filmAlreadyWatched = alreadyWatched? 'film-card__controls-item--active': '';
  const filmWatchlist = watchlist? 'film-card__controls-item--active': '';


  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmTitle}</h3>
        <p class="film-card__rating">${filmRaiting}</p>
        <p class="film-card__info">
          <span class="film-card__year">${filmDate}</span>
          <span class="film-card__duration">${filmHour}h ${filmMinutes}m</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="${filmPoster}" alt="" class="film-card__poster">
        <p class="film-card__description">${filmDescription}</p>
        <span class="film-card__comments">5 comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${filmWatchlist}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${filmAlreadyWatched}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${filmIsFavorite}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};


export default class FilmCardTemplateView extends AbstractView{
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  setShowFilmClickHandler = (callback) => {
    this._callback.showClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#showFilmHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  #favoriteClickHandler = (event) => {
    event.preventDefault();
    this._callback.favoriteClick();
  };

  #watchedClickHandler = (event) => {
    event.preventDefault();
    this._callback.watchedClick();
  };

  #showFilmHandler = (event) => {
    event.preventDefault();
    this._callback.showClick();
  };

  #watchListClickHandler = (event) => {
    event.preventDefault();
    this._callback.watchListClick();
  };
}

