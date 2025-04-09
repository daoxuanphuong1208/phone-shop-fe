import { Divider } from "antd";
import classNames from "classnames/bind";
import styles from "./AdminStatistical.module.scss";

const cx = classNames.bind(styles);

const AdminStatistical = () => {
  return (
    <div>
      <h2>Thống kê</h2>
      <Divider />
      <div>Nội dung</div>
    </div>
  );
};

export default AdminStatistical;
