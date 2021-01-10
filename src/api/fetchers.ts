import { apiClient } from "../core/utils/apiClient";
import { OrderDto } from "../types/api";

export const fetchOrders = async () => {
  const response = await apiClient().get<OrderDto[]>(
    `http://localhost:4400/orders`
  );
  return response.data;
};

export const fetchOrderById = async (orderId: string) => {
  const response = await apiClient().get<OrderDto>(
    `http://localhost:4400/orders/${orderId}`
  );
  return response.data;
};

export const updateOrderById = async (
  orderId: string,
  updateData: Partial<OrderDto>
) => {
  const response = await apiClient().put<Partial<OrderDto>>(
    `http://localhost:4400/orders/${orderId}`,
    updateData
  );
  return response.data;
};
