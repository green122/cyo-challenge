import { apiClient } from "../core/utils/apiClient";
import { OrderDto } from "../types/api";

export const fetchOrders = async () => {
  const response = await apiClient().get<OrderDto[]>(
    `http://localhost:4400/orders`
  );
  return response.data;
};
