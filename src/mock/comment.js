import {getRandomInteger} from '../utils/utils.js';

const generateCommentId = () => {
  const commentsId = ['42', '32', '96'];

  const randomIndex = getRandomInteger(0, commentsId.length -1 );
  return commentsId[randomIndex];
};

export const generateComment = () => ({
  id: generateCommentId(),
  author: 'Ilya O\'Reilly',
  comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  date: '2022-05-11T16:12:32.554Z',
  emotion: 'smile'
});
