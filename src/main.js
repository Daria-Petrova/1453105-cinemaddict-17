
import { render } from './render.js';
import FilterTemplateView from './view/filter-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import UserStatusTemplateView from './view/user-status-view.js';
import SortFilmsTemplateView from './view/sort-view.js';

import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comment-model.js';

const siteMainElement = document.querySelector('.main');
const userStatusElement = document.querySelector('.header');
const datailedFilmElement = document.body;
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filmsPresenter = new FilmsPresenter();

render(new UserStatusTemplateView(), userStatusElement);
render(new FilterTemplateView(), siteMainElement);
render(new SortFilmsTemplateView(), siteMainElement);
filmsPresenter.init(siteMainElement, filmsModel, datailedFilmElement, commentsModel);

