import { generateFilm } from '../mock/film';

export default class FilmsModel {
  #films = Array.from({length: 13}, generateFilm);

  get films() {
    return this.#films;
  }
}
