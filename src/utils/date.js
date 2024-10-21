import moment from "moment/moment";
import { format } from 'date-fns';

moment.locale('es');

const dateFormat = 'DD MMM YYYY';

// rawDate can be date, datetime or timestamp
export const toDateFormat = (rawDate, format = dateFormat) => {
  if (!moment(rawDate).isValid()){
    return '-'
  }
  return moment(rawDate).format(format)
};

export const formattedDate = (date) => {
  const originalDate = date.substring(0,10);
  const parts = originalDate?.split("-") || [0,0,0];
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};


export const formatDate =(isoDateTime)=>{
  return format(isoDateTime, 'yyyy-MM-dd');
}

export const isISODate = (date) => {
  // Check if the input is an instance of Date and is valid
  return date instanceof Date && !isNaN(date.getTime());
};
