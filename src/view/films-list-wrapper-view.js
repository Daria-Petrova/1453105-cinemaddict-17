import {createElement} from '../render.js';

const createFilmsListWrapperTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`
);

export default class FilmsListWrapperTemplateView {
  #element = null;

  get template() {
    return createFilmsListWrapperTemplate();
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
