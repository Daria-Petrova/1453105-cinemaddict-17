import {createElement} from '../render.js';

const createFilmsTemplateView = () => (
  '<div class="films-list__container"></div>'
);

export default class FilmsTemplateView {
  #element = null;

  get template() {
    return createFilmsTemplateView();
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
