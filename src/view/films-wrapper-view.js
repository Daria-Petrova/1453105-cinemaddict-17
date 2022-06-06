import {createElement} from '../render.js';

const createFilmsWrapperTemplate = () => (
  '<section class="films"></section>'
);

export default class FilmsWrapperTemplateView {
  #element = null;

  get template() {
    return createFilmsWrapperTemplate();
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
