import { twoDigitsString } from "./twoDigitsString";

export const isValidDate = (d: Date | number | string) => {
  const dateToCheck = d instanceof Date ? d : new Date(Number(d));
  return !isNaN(dateToCheck.getDate());
};

export const convertMillisecondsToDateString = (
  value: number | string
): string => {
  const date = new Date(Number(value));
  if (!isValidDate(date)) {
    return "--.--.--";
  }
  return [
    twoDigitsString(date.getDate()),
    twoDigitsString(date.getMonth() + 1),
    date.getFullYear(),
  ].join(".");
};

export const validateDate = (value?: number | string) => {
  return value && isValidDate(value) ? Number(value) : Date.now();
};
