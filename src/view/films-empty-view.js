import AbstractView from '../framework/view/abstract-view.js';

const createShowFilmsEmptyTemplate =()=> (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

export default class ShowFilmsEmptyTemplateView extends AbstractView {
  get template() {
    return createShowFilmsEmptyTemplate();
  }
}
