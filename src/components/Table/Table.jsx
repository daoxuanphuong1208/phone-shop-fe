import { Table } from "antd";

const TableCpn = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default TableCpn;
