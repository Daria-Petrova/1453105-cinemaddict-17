
import { render } from './framework/render.js';
import FilterTemplateView from './view/filter-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import UserStatusTemplateView from './view/user-status-view.js';
import SortFilmsTemplateView from './view/sort-view.js';

import FilmsModel from './model/films-model.js';

const siteMainElement = document.querySelector('.main');
const userStatusElement = document.querySelector('.header');
const filmsModel = new FilmsModel();

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel);

render(new UserStatusTemplateView(), userStatusElement);
render(new FilterTemplateView(), siteMainElement);
render(new SortFilmsTemplateView(), siteMainElement);
filmsPresenter.init();

