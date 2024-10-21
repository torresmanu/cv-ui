import moment from "moment/moment";
moment.locale('es');

const completeDateFormat = 'DD MMM YYYY h:mm';

// rawDate can be date, datetime or timestamp
export const toCompleteDateFormat = (rawDate, format = completeDateFormat) => {
  if (!moment(rawDate).isValid()){
    return '-'
  }
  return moment(rawDate).format(format)
};

