import { Divider } from "antd";
import classNames from "classnames/bind";
import styles from "./AdminCategories.module.scss";
import Table from "../../components/Table/Table";

const cx = classNames.bind(styles);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sydney No. 1 Lake Park",
  },
];

const AdminCategories = () => {
  return (
    <div>
      <div>Danh mục</div>
      <Divider />

      {data ? (
        <Table columns={columns} data={data} />
      ) : (
        <div>Không có dữ liệu</div>
      )}
    </div>
  );
};

export default AdminCategories;
