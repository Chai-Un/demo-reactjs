import moment from "moment";
import { DATE_FORMAT } from "./constants";

export const customDate = () => {
  const curentDate = new Date();
  curentDate.setDate(curentDate.getDate() + 1);
  const fromDate = moment(curentDate).format(DATE_FORMAT);
  const toDate = moment(fromDate).add(7, "days").format(DATE_FORMAT);
  return { min: fromDate, max: toDate };
};

export const getDateToday = () => {
  const curentDate = new Date();
  curentDate.setDate(curentDate.getDate() + 1);
  return moment(curentDate).format(DATE_FORMAT);
};

export const dateByVal = (val) => {
  return moment(val).get("date");
};

export const getNumberKey = (date) => {
  const d = new Date();
  const currentDate = dateByVal(d);
  const dateByChoose = dateByVal(date);
  return dateByChoose - currentDate > 3 ? 3 : dateByChoose - currentDate;
};
