import { useParams } from "react-router-dom";
import { Alert } from "antd";
import { fetchOrderById, updateOrderById } from "../../api/fetchers";
import {
  useFetching,
  useLazyFetching,
} from "../../core/hooks/useFetching/useFetching";
import React from "react";
import { OrderDetailsForm, OrderFormData } from "./OrderDetailsForm";
import { StyledLink, StyledSpinner } from "../../core/components/common";

export const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isLoading, error } = useFetching(
    ["order", orderId],
    fetchOrderById,
    [orderId]
  );

  const { start: updateOrder, state } = useLazyFetching(updateOrderById);

  const handler = (data: OrderFormData) => updateOrder(orderId, data);

  return (
    <>
      <StyledLink to="/orders">Return to the Orders Page</StyledLink>
      {isLoading && <StyledSpinner size="large" />}
      {error && <Alert message={error.message} type="error" />}
      {order && (
        <OrderDetailsForm
          order={order}
          onSubmit={handler}
          isUpdating={state.isLoading}
        />
      )}
    </>
  );
};
