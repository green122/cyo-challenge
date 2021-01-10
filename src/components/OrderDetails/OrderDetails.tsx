import { Link, useParams } from "react-router-dom";
import { Button, Descriptions, Spin } from "antd";
import { fetchOrderById } from "../../api/fetchers";
import { useFetching } from "../../core/hooks/useFetching/useFetching";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import React from "react";
import dayjs from "dayjs";
import DatePickerV2 from "../DatePickerV2/DatePickerV2";
import { useOrderUpdateForm } from "./useOrderUpdateForm";

const ButtonContainer = styled.div`
  margin-top: 12px;
`;

const StyledLink = styled(Link)`
  margin-left: 12px;
  &::hover {
    color: #1626a7;
  }
`;

export const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isLoading } = useFetching(
    ["order", orderId],
    fetchOrderById,
    [orderId]
  );

  const {
    handleSubmit,
    register,
    checkOnChange,
    dirty,
    control,
  } = useOrderUpdateForm(order);

  const onSubmit = handleSubmit(({ title, bookingDate }) => {
    console.log(title, bookingDate);
  });

  if (!order) {
    return null;
  }

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <Descriptions
          title="Order Details"
          layout="horizontal"
          bordered
          column={1}
        >
          <Descriptions.Item label="Title">
            <input
              className="ant-input"
              data-testid="title"
              name="title"
              onChange={checkOnChange}
              ref={register({ required: true })}
              defaultValue={order.title}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Booking Date">
            <Controller
              name="bookingDate"
              data-testid="date"
              control={control}
              defaultValue={dayjs(order.bookingDate)}
              render={(props) => (
                <DatePickerV2
                  defaultValue={dayjs(props.value)}
                  format="DD-MM-YYYY"
                  className="ant-input"
                  onChange={(dayjsDate) => {
                    props.onChange(dayjsDate?.valueOf());
                    checkOnChange();
                  }}
                />
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {order.address.street} <br />
            {order.address.city} <br />
            {order.address.country} <br />
          </Descriptions.Item>
          <Descriptions.Item label="Customer">
            {order.customer.name} <br />
            {order.customer.email} <br />
            {order.customer.phone} <br />
          </Descriptions.Item>
        </Descriptions>
        <ButtonContainer>
          <Button data-testid="submit" htmlType="submit" disabled={!dirty}>
            Update Order
          </Button>
          <StyledLink to="/orders">Return to Orders List</StyledLink>
        </ButtonContainer>
      </form>
    </div>
  );
};
