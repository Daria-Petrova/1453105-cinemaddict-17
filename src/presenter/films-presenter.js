import FilmCardTemplateView from '../view/film-card-view.js';
import ShowButtonTemplateView from '../view/show-more-button-view.js';
import FilmsWrapperTemplateView from '../view/films-wrapper-view.js';
import FilmsTemplateView from '../view/films-view.js';
import TopRatedFilmsTemplateView from '../view/film-top-rated-view.js';
import MostCommentedFilmsTemplateView from '../view/film-most-commented-view.js';
import FilmsListWrapperTemplateView from '../view/films-list-wrapper-view.js';
import FilmInfoTemplateView from '../view/film-info-view.js';

import {render} from '../render.js';

export default class FilmsPresenter {
  #filmsModel = null;
  #commentsModel = null;
  #films = null;
  #comments = null;
  #filmsContainer = null;
  #filmDetailedContainer = null;

  #filmWrapper = new FilmsWrapperTemplateView();
  #filmList = new FilmsTemplateView();
  topfilmList = new FilmsTemplateView();
  commentfilmList = new FilmsTemplateView();
  filmTopRated = new TopRatedFilmsTemplateView();
  filmMostComment = new MostCommentedFilmsTemplateView();
  #filmListWrapper = new FilmsListWrapperTemplateView();

  init = (filmsContainer, filmsModel, filmDetailedContainer, commentsModel) => {

    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filmDetailedContainer = filmDetailedContainer;
    this.#films = [...this.#filmsModel.films];
    this.#comments = [...this.#commentsModel.comments];

    render(this.#filmWrapper,this.#filmsContainer);
    render(this.#filmListWrapper, this.#filmWrapper.element);
    render(this.#filmList, this.#filmListWrapper.element);

    for (let i = 0; i < this.#films.length ; i++) {
      this.#renderFilm(this.#films[i]);
    }

    render(new ShowButtonTemplateView(), this.#filmWrapper.element);
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmCardTemplateView(film);
    const filmDetailedComponent = new FilmInfoTemplateView(film, this.#comments);

    const openDetailedFilm = () => {
      this.#filmDetailedContainer.appendChild(filmDetailedComponent.element);
      this.#filmDetailedContainer.classList.add('hide-overflow');
    };

    const closeDetailedFilm = () => {
      this.#filmDetailedContainer.removeChild(filmDetailedComponent.element);
      this.#filmDetailedContainer.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc'){
        closeDetailedFilm();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    filmComponent.element.querySelector('.film-card__link').addEventListener('click',() => {
      openDetailedFilm();
      document.addEventListener('keydown', onEscKeyDown);
      document.removeEventListener('click', openDetailedFilm, true);
    });

    filmDetailedComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      closeDetailedFilm();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(filmComponent, this.#filmList.element);
  };
}
