import { generateComment } from '../mock/comment';

export default class CommentsModel {
  #comments = Array.from({length: 10}, generateComment);

  get comments(){
    return this.#comments;
  }
}

