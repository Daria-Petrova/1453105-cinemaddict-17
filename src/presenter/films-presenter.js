import FilmCardTemplateView from '../view/film-card-view.js';
import ShowButtonTemplateView from '../view/show-more-button-view.js';
import FilmsWrapperTemplateView from '../view/films-wrapper-view.js';
import FilmsTemplateView from '../view/films-view.js';
import TopRatedFilmsTemplateView from '../view/film-top-rated-view.js';
import MostCommentedFilmsTemplateView from '../view/film-most-commented-view.js';
import FilmsListWrapperTemplateView from '../view/films-list-wrapper-view.js';
import FilmInfoTemplateView from '../view/film-info-view.js';
import ShowFilmsEmptyTemplateView from '../view/films-empty-view.js';

import CommentsModel from '../model/comment-model.js';

import {render, remove} from '../framework/render.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmsPresenter {
  #filmsModel = [];
  #comments = [];
  #filmsContainer = null;

  constructor(filmsContainer, filmsModel){
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  #commentsModel = new CommentsModel();
  #filmWrapperComponent = new FilmsWrapperTemplateView();
  #filmListComponent = new FilmsTemplateView();
  #topfilmListComponent = new FilmsTemplateView();
  #commentfilmListComponent = new FilmsTemplateView();
  #filmTopRatedComponent = new TopRatedFilmsTemplateView();
  #filmMostCommentComponent = new MostCommentedFilmsTemplateView();
  #filmListWrapperComponent = new FilmsListWrapperTemplateView();
  #buttonShowMoreComponent = new ShowButtonTemplateView();
  #filmsEmptyComponent = new ShowFilmsEmptyTemplateView();
  #filmDetailedComponent = null;

  #films = [];
  #renderedFilmCount = FILM_COUNT_PER_STEP;

  init = () => {
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];
    this.#renderFilmDesk();
  };

  #handleShowMoreButtonClick = () => {
    this.#films.slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP).forEach((film) => this.#renderFilm(film));
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this.#renderedFilmCount >= this.#films.length) {
      remove(this.#buttonShowMoreComponent);
    }
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmCardTemplateView(film);

    const closeDetailedFilm = () => {
      remove(this.#filmDetailedComponent);
      document.body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc'){
        closeDetailedFilm();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const openDetailedFilm = () => {
      remove(this.#filmDetailedComponent);
      this.#filmDetailedComponent = new FilmInfoTemplateView(film, this.#comments);
      this.#filmDetailedComponent.setCloseFilmClickHandler(() => {
        closeDetailedFilm();
        document.removeEventListener('keydown', onEscKeyDown);
      });
      render(this.#filmDetailedComponent, document.body);
      document.body.classList.add('hide-overflow');
    };

    filmComponent.setShowFilmClickHandler(() => {
      openDetailedFilm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    render(filmComponent, this.#filmListComponent.element);
  };

  #renderFilmDesk = () => {
    render(this.#filmWrapperComponent,this.#filmsContainer);
    render(this.#filmListWrapperComponent, this.#filmWrapperComponent.element);
    render(this.#filmListComponent, this.#filmListWrapperComponent.element);

    if (this.#films.length === 0) {
      render(this.#filmsEmptyComponent, this.#filmListWrapperComponent.element);
    } else {
      for (let i = 0; i < Math.min(this.#films.length, FILM_COUNT_PER_STEP) ; i++) {
        this.#renderFilm(this.#films[i]);
      }
      if (this.#films.length > FILM_COUNT_PER_STEP) {
        render(this.#buttonShowMoreComponent, this.#filmWrapperComponent.element);
        this.#buttonShowMoreComponent.setClickHandler(this.#handleShowMoreButtonClick);
      }
    }
  };
}
