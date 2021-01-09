import { useParams } from "react-router-dom";

export const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  return <div>Order Details {orderId}</div>;
};
