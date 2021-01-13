import { OrderDto } from "./api";

export interface IRouteState {
  from: {
    pathname: string;
  };
}

export type UpdateOrderData = Pick<OrderDto, "title" | "bookingDate">;
