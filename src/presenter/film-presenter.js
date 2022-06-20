import FilmInfoTemplateView from '../view/film-info-view.js';
import FilmCardTemplateView from '../view/film-card-view.js';

import CommentsModel from '../model/comment-model.js';

import {render, remove, replace} from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP'
};

export default class FilmPresenter {
  #film = {};
  #mode = Mode.DEFAULT;
  #comments = [];
  #filmListContainer = null;
  #filmComponent = null;
  #filmDetailedComponent = null;
  #changeData = null;
  #changeMode = null;

  constructor(filmListContainer, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  #commentsModel = new CommentsModel();

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevFilmDetailedComponent = this.#filmDetailedComponent;

    this.#filmComponent = new FilmCardTemplateView(this.#film);
    this.#filmDetailedComponent = new FilmInfoTemplateView(this.#film, this.#comments);
    this.#comments = [...this.#commentsModel.comments];

    this.#filmComponent.setShowFilmClickHandler(() => {
      this.#openDetailedFilm();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmComponent.setWatchListClickHandler(this.#handleWatchListClick);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer);
      return;
    }

    if (this.#filmListContainer.contains(prevFilmComponent.element)){
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (document.body.contains(prevFilmDetailedComponent.element)){
      this.#closeDetailedFilm();
      this.#openDetailedFilm();
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailedComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#filmListContainer);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT){
      this.#closeDetailedFilm();
    }
  };

  #closeDetailedFilm = () => {
    remove(this.#filmDetailedComponent);
    document.body.classList.remove('hide-overflow');
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc'){
      this.#closeDetailedFilm();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #openDetailedFilm = () => {
    remove(this.#filmDetailedComponent);

    this.#filmDetailedComponent = new FilmInfoTemplateView(this.#film, this.#comments);
    this.#filmDetailedComponent.setCloseFilmClickHandler(() => {
      this.#closeDetailedFilm();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });

    this.#filmDetailedComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmDetailedComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmDetailedComponent.setWatchListClickHandler(this.#handleWatchListClick);

    render(this.#filmDetailedComponent, document.body);

    this.#changeMode();
    this.#mode = Mode.POPUP;
  };

  #handleFavoriteClick = () => {
    const update = {...this.#film };
    update.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#changeData(update);
  };

  #handleWatchedClick = () => {
    const update = {...this.#film };
    update.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#changeData(update);
  };

  #handleWatchListClick = () => {
    const update = {...this.#film };
    update.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#changeData(update);
  };
}

