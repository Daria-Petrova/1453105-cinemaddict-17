import {createElement} from '../render.js';

const createFilmsTemplateView = () => (
  '<div class="films-list__container"></div>'
);

export default class FilmsTemplateView {
  getTemplate() {
    return createFilmsTemplateView();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement(){
    this.element = null;
  }
}
