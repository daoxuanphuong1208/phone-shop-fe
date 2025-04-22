import { Table } from "antd";

const TableCpn = ({ columns, data, pageSize = 5 }) => {
  return (
    <Table
      rowKey="_id"
      pagination={{ pageSize: pageSize }}
      columns={columns}
      dataSource={data}
    />
  );
};

export default TableCpn;
