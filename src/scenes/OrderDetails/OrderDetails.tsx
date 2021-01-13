import { useParams } from "react-router-dom";
import { Alert, notification } from "antd";
import { fetchOrderById, updateOrderById } from "../../api/fetchers";
import {
  useFetching,
  useLazyFetching,
} from "../../core/hooks/useFetching/useFetching";
import React, { useEffect } from "react";
import { OrderDetailsForm } from "./OrderDetailsForm";
import { StyledLink, StyledSpinner } from "../../core/components/common";
import { UpdateOrderData } from "../../types/common";

export const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isLoading, error } = useFetching(
    ["order", orderId],
    fetchOrderById,
    [orderId]
  );

  const { start: updateOrder, state } = useLazyFetching(updateOrderById);

  const handler = (data: UpdateOrderData) => {
    updateOrder(orderId, data);
  };

  // TODO: Add more general error handling
  useEffect(() => {
    if (!state.error) return;
    notification.error({ message: "Something bad has happened" });
  }, [state.error]);

  // TODO(Minor): Probably we need to update data at the form to disable update button
  useEffect(() => {
    if (!state.data) return;
    notification.success({ message: "Order successfully updated" });
  }, [state.data]);

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
