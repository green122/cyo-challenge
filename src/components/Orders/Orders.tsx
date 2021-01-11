import React from "react";
import { Alert, Table } from "antd";
import { ColumnType } from "antd/lib/table/interface";
import { useHistory } from "react-router-dom";
import { fetchOrders } from "../../api/fetchers";
import { useFetching } from "../../core/hooks/useFetching/useFetching";
import { convertMillisecondsToDate } from "../../core/utils/date";
import { OrderDto } from "../../types/api";
import { SceneContainer, StyledSpinner } from "../../core/components/common";

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
  const { data, isLoading, error } = useFetching("orders", fetchOrders);
  const history = useHistory();

  const onRowClick = (order: OrderDto) => history.push(`orders/${order.id}`);

  return (
    <SceneContainer>
      {isLoading && <StyledSpinner size="large" />}
      {error && <Alert message={error.message} type="error" />}
      {data && (
        <Table
          dataSource={data}
          rowKey="id"
          // TODO: apply styled-components instead the global class
          rowClassName="table-row-link"
          columns={columns}
          onRow={(record) => ({
            onClick: () => onRowClick(record),
          })}
        />
      )}
    </SceneContainer>
  );
};
