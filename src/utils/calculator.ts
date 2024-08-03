import { IRevenueStatistic } from "@/types/dashboard";

const totalRevenueYear = (data?: IRevenueStatistic["thisYear"]) => {
  if (!data) return 0;
  return data?.reduce((acc, curr) => acc + +Object.values(curr)?.[0], 0);
};

export { totalRevenueYear };
