import { nanoid } from 'nanoid';
import {getRandomInteger} from '../utils/utils.js';
import {setRandomBoolean } from '../utils/utils.js';

const generateCommentId = () => {
  const commentsId = ['42', '32', '96'];

  const randomIndex = getRandomInteger(0, commentsId.length -1 );
  return commentsId[randomIndex];
};

const generateTitle = () => {
  const titles = ['The Godfather', 'The Dark Knight', 'Schindlers List', 'The Lord of the Rings','A Little Pony Without The Carpet'];
  const randomIndex = getRandomInteger(0, titles.length -1 );
  return titles[randomIndex];
};

export const generateFilm = () => ({
  id: nanoid(),
  comment: [generateCommentId() , generateCommentId()],
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: 'Laziness Who Sold Themselves',
    totalRating: 5.3,
    poster: './images/posters/the-dance-of-life.jpg',
    ageRating: 6,
    director: 'Tom Ford',
    writers: ['Takeshi Kitano', 'Heinz Herald', 'Richard Weil'],
    actors: ['Morgan Freeman', 'Erich von Stroheim'],
    release: {
      date: '2019-11-11T00:00:00.000Z',
      releaseCountry: 'Finland'
    },
    runtime: 77,
    genre: ['Comedy', 'Drama'],
    description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
  },
  userDetails: {
    watchlist: setRandomBoolean(),
    alreadyWatched: setRandomBoolean(),
    watchingDate : '2019-04-12T16:12:32.554Z',
    favorite : setRandomBoolean()
  }
});

