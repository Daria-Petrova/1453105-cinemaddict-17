import { generateComment } from '../mock/comment';

export default class CommentsModel {
  comments = Array.from({length: 6}, generateComment);

  getComments = () => this.comments;
}

