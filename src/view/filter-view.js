import AbstractView from '../framework/view/abstract-view.js';

const countFilter = (filterCount) => {
  const countNumber = filterCount;
  return (
    `<span class="main-navigation__item-count">${countNumber}</span>`);
};


const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  return (`<a href="#${name}" class="main-navigation__item">${name}${countFilter(count)}</a>`);
};


const createFilterTemplateView = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return(`<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  ${filterItemsTemplate}
  </nav>`);
};

export default class FilterTemplateView  extends AbstractView{
  #filters = null;

  constructor(filters){
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplateView(this.#filters);
  }
}
