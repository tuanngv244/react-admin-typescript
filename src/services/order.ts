import { PaginationType } from "@/types/general";
import { IOrder, IOrderQuery } from "@/types/order";
import axiosInstance from "@/utils/axiosInstance";

const basePath = "/orders" as const;

type TGetOrderResponse = { orders: IOrder[]; pagination: PaginationType };

export const orderService = {
  getOrders(
    payload: Partial<IOrderQuery>
  ): Promise<{ data: TGetOrderResponse }> {
    return axiosInstance.get(`${basePath}`, { params: payload });
  },
};
