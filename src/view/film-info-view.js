import AbstractView from '../framework/view/abstract-view.js';
import { getHours, getMinutes, getHumaneDate , getRelativeDate, filterCommentsByIdList} from '../utils/utils.js';

const countingComments = (commentList, idList) => {
  if (commentList && idList) {
    const  numberOfComments = filterCommentsByIdList(commentList, idList);
    return numberOfComments.length;
  }
};

const createCommentList = (commentList, idList) => {
  if (commentList && idList) {
    const  numberOfComments = filterCommentsByIdList(commentList, idList);
    let listTemplate = '';
    numberOfComments.forEach((element) => {
      listTemplate = `${listTemplate}<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${element.emotion}.png" width="55" height="55" alt="emoji-${element.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">Boooo${element.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${element.author}</span>
          <span class="film-details__comment-day">${getRelativeDate(element.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
    });
    return listTemplate;
  }
};

const createGunreList = (genreList) => {
  let genreTemplate  = '';
  genreList.forEach((element) => {
    genreTemplate = `${genreTemplate}<span class="film-details__genre">${element}</span>`;
  });
  return genreTemplate;
};

const createFilmDetailsInfo = (film = {}) => {
  const {title, release , runtime, description, totalRating, alternativeTitle, director, writers, actors, genre} = film;
  const filmRaiting = totalRating !== null? totalRating: '0.0';
  const filmDate = release.date !== null? getHumaneDate(release.date): '';
  const filmHour = runtime !== null? getHours(runtime): '';
  const filmMinutes = runtime !== null? getMinutes(runtime): '';

  const genreList = createGunreList(genre);

  return (
    `<div class="film-details__info">
    <div class="film-details__info-head">
      <div class="film-details__title-wrap">
        <h3 class="film-details__title">${title}</h3>
        <p class="film-details__title-original">${alternativeTitle}</p>
      </div>
  
      <div class="film-details__rating">
        <p class="film-details__total-rating">${filmRaiting}</p>
      </div>
    </div>
  
    <table class="film-details__table">
      <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">${director}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">${writers}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">${actors}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">${filmDate}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">${filmHour}h ${filmMinutes}m</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">${release.releaseCountry}</td>
      </tr>
      <tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">
          ${genreList}</td>
      </tr>
    </table>
    <p class="film-details__film-description">
      ${description}
    </p>
  </div>
  </div>`
  );
};

const createDetailedInfoTemplateView = (film = {}, commentList = []) => {
  const {filmInfo, comment } = film;

  const infoTemplate = createFilmDetailsInfo(filmInfo);
  const commentListTemplate = createCommentList(commentList, comment);
  const commentCount = countingComments(commentList, comment);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">
    
              <p class="film-details__age">${filmInfo.ageRating}+</p>
            </div>
            ${infoTemplate}
          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>
    
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentCount}</span></h3>
            <ul class="film-details__comments-list">${commentListTemplate}</ul>
            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
    
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmInfoTemplateView extends AbstractView {
  #film = null;
  #commentList = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#commentList = comments;
  }

  get template() {
    return createDetailedInfoTemplateView(this.#film, this.#commentList);
  }

  setCloseFilmClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.addEventListener('click', this.#closeFilmHandler);
  };

  #closeFilmHandler = (event) => {
    event.preventDefault();
    this._callback.closeClick();
  };
}
