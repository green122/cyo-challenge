import { Table } from "antd";
import { ColumnType } from "antd/lib/table/interface";
import { useHistory } from "react-router-dom";
import { fetchOrders } from "../../api/fetchers";
import { useFetching } from "../../core/hooks/useFetching/useFetching";
import { convertMillisecondsToDate } from "../../core/utils/date";
import { OrderDto } from "../../types/api";

const columns: ColumnType<OrderDto>[] = [
  {
    title: "Name",
    dataIndex: "title",
    key: "name",
  },
  {
    title: "Booking Date",
    dataIndex: "bookingDate",
    key: "bookingDate",
    render: convertMillisecondsToDate,
  },
  {
    title: "Address",
    dataIndex: ["address", "street"],
    key: "address",
  },
  {
    title: "Customer",
    dataIndex: ["customer", "name"],
    key: "customer",
  },
];

export const Orders: React.FC = () => {
  const { data } = useFetching("orders", fetchOrders);
  const history = useHistory();

  if (!data) {
    return null;
  }

  const onRowClick = (order: OrderDto) => history.push(`orders/${order.id}`);

  return (
    <div className="container">
      <Table
        dataSource={data}
        columns={columns}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
      />
    </div>
  );
};
