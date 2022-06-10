import AbstractView from '../framework/view/abstract-view.js';
import { getYearfromDate, getHours, getMinutes, getShortDescription } from '../utils/utils.js';

const createFilmCardTemplate = (film) => {
  const { title, release , runtime, description, totalRating, genre, poster}  = film.filmInfo;

  const filmTitle = title !== null? title: '';
  const filmRaiting = totalRating !== null? totalRating: '0.0';
  const filmDate = release.date !== null? getYearfromDate(release.date): '';
  const filmHour = runtime !== null? getHours(runtime): '';
  const filmMinutes = runtime !== null? getMinutes(runtime): '';
  const filmPoster = poster !== null? poster: '';
  const filmDescription = description !== null? getShortDescription(description): '';


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
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
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

  #showFilmHandler = (event) => {
    event.preventDefault();
    this._callback.showClick();
  };
}

