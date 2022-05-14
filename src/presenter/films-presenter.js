import FilmCardTemplateView from '../view/film-card-view.js';
import ShowButtonTemplateView from '../view/show-more-button-view.js';
import FilmsWrapperTemplateView from '../view/films-wrapper-view.js';
import FilmsTemplateView from '../view/films-view.js';
import TopRatedFilmsTemplateView from '../view/film-top-rated-view.js';
import MostCommentedFilmsTemplateView from '../view/film-most-commented-view.js';
import FilmsListWrapperTemplateView from '../view/films-list-wrapper-view.js';

import {render} from '../render.js';

export default class FilmsPresenter {
  filmWrapper = new FilmsWrapperTemplateView();
  filmList = new FilmsTemplateView();
  topfilmList = new FilmsTemplateView();
  commentfilmList = new FilmsTemplateView();
  filmTopRated = new TopRatedFilmsTemplateView();
  filmMostComment = new MostCommentedFilmsTemplateView();
  filmListWrapper = new FilmsListWrapperTemplateView();

  init = (filmsContainer) => {
    this.filmsContainer = filmsContainer;

    render(this.filmWrapper,this.filmsContainer);
    render(this.filmListWrapper, this.filmWrapper.getElement());

    render(this.filmList, this.filmListWrapper.getElement());
    for (let i = 0; i < 5 ; i++) {
      render(new FilmCardTemplateView(), this.filmList.getElement());
    }

    render(new ShowButtonTemplateView(), this.filmWrapper.getElement());

    render(this.filmTopRated,this.filmWrapper.getElement());
    render(this.topfilmList, this.filmTopRated.getElement());
    for (let i = 0; i < 2 ; i++) {
      render(new FilmCardTemplateView(), this.topfilmList.getElement());
    }

    render(this.filmMostComment,this.filmWrapper.getElement());
    render(this.commentfilmList, this.filmMostComment.getElement());
    for (let i = 0; i < 2 ; i++) {
      render(new FilmCardTemplateView(), this.commentfilmList.getElement());
    }
  };
}
