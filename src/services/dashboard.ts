import { IMemberStatistic, IRevenueStatistic } from "@/types/dashboard";
import axiosInstance from "@/utils/axiosInstance";

const basePath = "/dashboard" as const;

export const dashboardService = {
  getMemberStatistic(payload: {
    fromDate?: string;
    toDate?: string;
  }): Promise<{ data: IMemberStatistic }> {
    return axiosInstance.get(`${basePath}`, { params: payload });
  },
  getRevenuesStatistic(payload: {
    year?: number;
  }): Promise<{ data: IRevenueStatistic }> {
    return axiosInstance.get(`${basePath}/order-split-by-months`, {
      params: payload,
    });
  },
};
