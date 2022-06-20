
import { render } from './framework/render.js';
import FilterTemplateView from './view/filter-view.js';
import FilmsPresenter from './presenter/film-list-presenter.js';
import UserStatusTemplateView from './view/user-status-view.js';

import FilmsModel from './model/films-model.js';
import { generateFilter } from './mock/filter.js';

const siteMainElement = document.querySelector('.main');
const userStatusElement = document.querySelector('.header');
const filmsModel = new FilmsModel();
const filters = generateFilter(filmsModel.films);

const filmsPresenter = new FilmsPresenter(siteMainElement, filmsModel);

render(new UserStatusTemplateView(), userStatusElement);
render(new FilterTemplateView(filters), siteMainElement);
filmsPresenter.init();

