import AbstractView from '../framework/view/abstract-view.js';

const createFilmsMostCommentedTemplate = () => (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
  </section>`
);

export default class MostCommentedFilmsTemplateView extends AbstractView {
  get template() {
    return createFilmsMostCommentedTemplate();
  }
}
