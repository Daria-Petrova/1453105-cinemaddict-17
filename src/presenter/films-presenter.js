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

import {render} from '../framework/render.js';

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
  #filmWrapper = new FilmsWrapperTemplateView();
  #filmList = new FilmsTemplateView();
  topfilmList = new FilmsTemplateView();
  commentfilmList = new FilmsTemplateView();
  filmTopRated = new TopRatedFilmsTemplateView();
  filmMostComment = new MostCommentedFilmsTemplateView();
  #filmListWrapper = new FilmsListWrapperTemplateView();
  #buttonShowMore = new ShowButtonTemplateView();
  #filmsEmpty = new ShowFilmsEmptyTemplateView();

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
      this.#buttonShowMore.element.remove();
      this.#buttonShowMore.removeElement();
    }
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmCardTemplateView(film);
    const filmDetailedComponent = new FilmInfoTemplateView(film, this.#comments);

    const closeDetailedFilm = () => {
      document.body.removeChild(filmDetailedComponent.element);
      document.body.classList.remove('hide-overflow');
    };

    const openDetailedFilm = () => {
      if (document.body.querySelector('.film-details')) {
        document.body.querySelector('.film-details').remove();
      }
      document.body.appendChild(filmDetailedComponent.element);
      document.body.classList.add('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc'){
        closeDetailedFilm();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.setShowFilmClickHandler(() => {
      openDetailedFilm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    filmDetailedComponent.setCloseFilmClickHandler(() => {
      closeDetailedFilm();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmComponent, this.#filmList.element);
  };

  #renderFilmDesk = () => {
    render(this.#filmWrapper,this.#filmsContainer);
    render(this.#filmListWrapper, this.#filmWrapper.element);
    render(this.#filmList, this.#filmListWrapper.element);

    if (this.#films.length === 0) {
      render(this.#filmsEmpty, this.#filmListWrapper.element);
    } else {
      for (let i = 0; i < Math.min(this.#films.length, FILM_COUNT_PER_STEP) ; i++) {
        this.#renderFilm(this.#films[i]);
      }
      if (this.#films.length > FILM_COUNT_PER_STEP) {
        render(this.#buttonShowMore, this.#filmWrapper.element);
        this.#buttonShowMore.setClickHandler(this.#handleShowMoreButtonClick);
      }
    }
  };
}
