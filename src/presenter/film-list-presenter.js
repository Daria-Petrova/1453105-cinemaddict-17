import ShowButtonTemplateView from '../view/show-more-button-view.js';
import FilmsWrapperTemplateView from '../view/films-wrapper-view.js';
import FilmsTemplateView from '../view/films-view.js';
import TopRatedFilmsTemplateView from '../view/film-top-rated-view.js';
import MostCommentedFilmsTemplateView from '../view/film-most-commented-view.js';
import FilmsListWrapperTemplateView from '../view/films-list-wrapper-view.js';
import ShowFilmsEmptyTemplateView from '../view/films-empty-view.js';
import SortFilmsTemplateView from '../view/sort-view.js';

import {render, remove, RenderPosition} from '../framework/render.js';
import { updateItem } from '../utils/utils.js';
import FilmPresenter from './film-presenter.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #filmsModel = [];
  #filmsContainer = null;

  constructor(filmsContainer, filmsModel){
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  #filmWrapperComponent = new FilmsWrapperTemplateView();
  #filmListComponent = new FilmsTemplateView();
  #topfilmListComponent = new FilmsTemplateView();
  #commentfilmListComponent = new FilmsTemplateView();
  #filmTopRatedComponent = new TopRatedFilmsTemplateView();
  #filmMostCommentComponent = new MostCommentedFilmsTemplateView();
  #filmListWrapperComponent = new FilmsListWrapperTemplateView();
  #buttonShowMoreComponent = new ShowButtonTemplateView();
  #filmsEmptyComponent = new ShowFilmsEmptyTemplateView();
  #sortFilmsComponent = new SortFilmsTemplateView();

  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#renderFilmDesk();
  };

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleShowMoreButtonClick = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#buttonShowMoreComponent);
    }
  };

  #handleFilmChange = (updateFilm) => {
    this.#films = updateItem(this.#films, updateFilm);
    this.#filmPresenter.get(updateFilm.id).init(updateFilm);
  };

  #renderSort = () => {
    render(this.#sortFilmsComponent, this.#filmListWrapperComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderEmptyFilm = () => {
    render(this.#filmsEmptyComponent, this.#filmListWrapperComponent.element);
  };

  #renderShowMoreButton = () => {
    render(this.#buttonShowMoreComponent, this.#filmWrapperComponent.element);
    this.#buttonShowMoreComponent.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListComponent.element, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderFilms = (from, to) => {
    this.#films.slice(from, to).forEach((film) => this.#renderFilm(film));
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter)=> presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this.#buttonShowMoreComponent);
  };

  #renderFilmList = () => {
    render(this.#filmListComponent, this.#filmListWrapperComponent.element);
    this.#renderFilms(0,Math.min(this.#films.length, FILM_COUNT_PER_STEP));
    if (this.#films.length > FILM_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #renderFilmDesk = () => {
    render(this.#filmWrapperComponent,this.#filmsContainer);
    render(this.#filmListWrapperComponent, this.#filmWrapperComponent.element);

    if (this.#films.length === 0) {
      this.#renderEmptyFilm();
      return ;
    }
    this.#renderSort();
    this.#renderFilmList();
  };
}
