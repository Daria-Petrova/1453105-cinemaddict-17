import AbstractView from '../framework/view/abstract-view.js';

const createShowButtonTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);


export default class ShowButtonTemplateView extends AbstractView{
  get template() {
    return createShowButtonTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (event) => {
    event.preventDefault();
    this._callback.click();
  };
}

