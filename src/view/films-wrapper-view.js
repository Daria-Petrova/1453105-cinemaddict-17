import AbstractView from '../framework/view/abstract-view.js';

const createFilmsWrapperTemplate = () => (
  '<section class="films"></section>'
);

export default class FilmsWrapperTemplateView extends AbstractView{
  get template() {
    return createFilmsWrapperTemplate();
  }
}
