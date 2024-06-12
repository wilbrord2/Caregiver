let startYear = 2020;
let iSavingsStartYear = 2023;
const defaultMonths = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const getDateInfo = () => {
  const currentYear = new Date().getFullYear();
  let years = Array(currentYear - startYear + 1)
    .fill(0)
    .map((_, index) => startYear + index);
  let iSavingsYears = Array(currentYear - iSavingsStartYear + 1)
    .fill(0)
    .map((_, index) => iSavingsStartYear + index);
  const months = defaultMonths;
  return { months, years, iSavingsYears };
};
