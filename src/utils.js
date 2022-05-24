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


export {getYearfromDate, getHours, getMinutes, getShortDescription, getHumaneDate, getRelativeDate};
