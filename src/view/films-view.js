import AbstractView from '../framework/view/abstract-view.js';

const createFilmsTemplateView = () => (
  '<div class="films-list__container"></div>'
);

export default class FilmsTemplateView extends AbstractView{
  get template() {
    return createFilmsTemplateView();
  }
}
