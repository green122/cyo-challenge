import { apiClient } from "../core/utils/apiClient";

export const fetchOrders = (orderId: string) =>
  apiClient().get(`localhost:40001/orders/`);
