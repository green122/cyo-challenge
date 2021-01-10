function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getDate());
}

export const convertMillisecondsToDate = (value: number | string) => {
  const date = new Date(Number(value));
  if (!isValidDate(date)) {
    return "--.--.--";
  }
  return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join(".");
};
