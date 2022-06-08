import {createElement} from '../render.js';

const createShowFilmsEmptyTemplate =()=> (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

export default class ShowFilmsEmptyTemplateView {
  #element = null;

  get template() {
    return createShowFilmsEmptyTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement(){
    this.#element = null;
  }
}
