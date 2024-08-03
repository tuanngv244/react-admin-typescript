import dayjs from "dayjs";

const TOTAL_COST = 500000000; // example total cost for one year.

const yearOptions = Array.from({ length: 5 }).map((_, index) => {
  const currentYear = dayjs().year();
  return {
    value: currentYear - index,
    label: currentYear - index,
  };
});

export { yearOptions, TOTAL_COST };
