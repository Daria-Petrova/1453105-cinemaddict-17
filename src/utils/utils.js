import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(duration);

const getYearfromDate = (date) => dayjs(date).format('YYYY');
const getHours = (fullMinutes) => Math.floor(dayjs.duration({minutes:fullMinutes}).asHours());
const getMinutes = (fullMinutes) => (fullMinutes - getHours(fullMinutes)*60);
const getHumaneDate = (date) => dayjs(date).format('DD MMMM YYYY');
const getRelativeDate = (date) => dayjs(date).fromNow();

const getShortDescription = (text) => {
  if (text.length > 140) {
    return (`${text.substring(0, 139)  }...`);
  }
  return text;
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const setRandomBoolean = () => Boolean(getRandomInteger(0, 1));

const filterCommentsByIdList = (commentList, idList) => {
  const preparedList = [];
  idList.forEach( (j) => {
    commentList.forEach((i) => {
      if (j === i.id) {
        preparedList.push(i);
      }
    });
  });
  return preparedList;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item)=> item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export {getYearfromDate,
  getHours,
  getMinutes,
  getShortDescription,
  getHumaneDate,
  getRelativeDate,
  getRandomInteger,
  filterCommentsByIdList,
  updateItem,
  setRandomBoolean};
