import AbstractView from '../framework/view/abstract-view.js';

const createFilmsListWrapperTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`
);

export default class FilmsListWrapperTemplateView extends AbstractView {
  get template() {
    return createFilmsListWrapperTemplate();
  }
}
