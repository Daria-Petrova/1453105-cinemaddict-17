import {createElement} from '../render.js';

const createShowButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);


export default class ShowButtonTemplateView {
  getTemplate() {
    return createShowButtonTemplate();
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

