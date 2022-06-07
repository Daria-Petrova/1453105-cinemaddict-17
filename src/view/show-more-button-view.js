import {createElement} from '../render.js';

const createShowButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);


export default class ShowButtonTemplateView {
  #element = null;

  get template() {
    return createShowButtonTemplate();
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

