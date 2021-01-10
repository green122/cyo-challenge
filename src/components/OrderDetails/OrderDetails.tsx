import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { fetchOrderById, updateOrderById } from "../../api/fetchers";
import {
  useFetching,
  useLazyFetching,
} from "../../core/hooks/useFetching/useFetching";
import React from "react";
import { OrderDetailsForm, OrderFormData } from "./OrderDetailsForm";

export const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isLoading } = useFetching(
    ["order", orderId],
    fetchOrderById,
    [orderId]
  );

  const { start: updateOrder } = useLazyFetching(updateOrderById);

  const handler = (data: OrderFormData) => updateOrder(orderId, data);

  if (!order) {
    return null;
  }

  if (isLoading) {
    return <Spin size="large" />;
  }

  return <OrderDetailsForm order={order} onSubmit={handler} />;
};
