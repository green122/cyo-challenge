import { apiClient } from "../core/utils/apiClient";
import { OrderDto } from "../types/api";
import { UpdateOrderData } from "../types/common";
import { orderByIdUrl, ordersUrl } from "./apiRoutes";

export const fetchOrders = async () => {
  const response = await apiClient().get<OrderDto[]>(ordersUrl);
  return response.data;
};

export const fetchOrderById = async (orderId: string) => {
  const response = await apiClient().get<OrderDto>(orderByIdUrl(orderId));
  return response.data;
};

export const updateOrderById = async (
  orderId: string,
  updateData: UpdateOrderData
) => {
  const response = await apiClient().put<UpdateOrderData>(
    orderByIdUrl(orderId),

    updateData
  );
  return response.data;
};
