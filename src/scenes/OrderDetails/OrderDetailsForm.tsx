import { Button, Descriptions } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { OrderDto } from "../../types/api";
import DatePickerV2 from "../../components/DatePickerV2/DatePickerV2";
import { useOrderUpdateForm } from "./useOrderUpdateForm";
import { UpdateOrderData } from "../../types/common";

const ButtonContainer = styled.div`
  margin-top: 12px;
`;
interface OrderDetailsProps {
  order: OrderDto;
  onSubmit(data: UpdateOrderData): void;
  isUpdating: boolean;
}

export const OrderDetailsForm: React.FC<OrderDetailsProps> = ({
  order,
  onSubmit,
  isUpdating,
}) => {
  const {
    handleSubmit,
    register,
    checkOnChange,
    dirty,
    control,
    errors,
    isValid,
  } = useOrderUpdateForm(order);

  const submitHandler = handleSubmit(({ title, bookingDate }) => {
    onSubmit({ title, bookingDate });
  });

  const parsedDate = dayjs(Date.now());
  const dateDefaultValue = parsedDate.isValid() ? parsedDate : dayjs();

  // TODO: improve form's error notifications
  return (
    <form onSubmit={submitHandler}>
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
          {errors.title && <div>This field shouldn't be empty</div>}
        </Descriptions.Item>
        {/* TODO: Now if input data is incorrect - we handle it as the current data. And we dont handle clear field button.
        Probably we should think about it */}
        <Descriptions.Item label="Booking Date">
          <Controller
            name="bookingDate"
            control={control}
            defaultValue={dateDefaultValue}
            render={(props) => (
              <DatePickerV2
                data-testid="date"
                value={dayjs(props.value)}
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
        <Button
          data-testid="submit"
          htmlType="submit"
          disabled={!dirty || !isValid}
          loading={isUpdating}
        >
          Update Order
        </Button>
      </ButtonContainer>
    </form>
  );
};
