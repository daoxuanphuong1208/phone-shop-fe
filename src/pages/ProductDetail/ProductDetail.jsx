import { Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./ProductDetail.module.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const cx = classNames.bind(styles);
const ProductDetail = () => {
  return (
    <div>
      <Breadcrumb />
      <div className={cx("content")}>
        
      </div>
    </div>
  );
};

export default ProductDetail;
