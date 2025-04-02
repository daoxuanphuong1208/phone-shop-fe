import {
  ProductOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SlidersOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import classNames from "classnames/bind";
import styles from "./AdminPage.module.scss";
import Header from "../../components/Header/Header";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import AdminSlider from "../../components/AdminSlider/AdminSlider";
import { useState } from "react";

const cx = classNames.bind(styles);

const items = [
  {
    key: "1",
    label: "Trang chủ",
    icon: <HomeOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Người dùng",
    icon: <UserOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "3",
    label: "Sản phẩm",
    icon: <ProductOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "4",
    label: "Đơn hàng",
    icon: <ShoppingCartOutlined />,
  },
  {
    key: "5",
    label: "Slider",
    icon: <SlidersOutlined />,
  },
];

const AdminPage = () => {
  const [keyCurrent, setKeyCurrent] = useState("1");

  const renderComponent = (key) => {
    switch (key) {
      case "1":
        return <AdminUser />;
      case "2":
        return <AdminUser />;
      case "3":
        return <AdminProduct />;
      case "4":
        return <AdminOrder />;
      case "5":
        return <AdminSlider />;
      default:
        return <>Không có nội dung</>;
    }
  };
  const onClick = (e) => {
    setKeyCurrent(e.key);
  };

  return (
    <>
      <div className={cx("header")}>
        <Header isHiddenSearch isHiddenCart />
      </div>
      <div className={cx("wrapper", "container")}>
        <div className={cx("menu")}>
          <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </div>
        <div className={cx("content")}>{renderComponent(keyCurrent)}</div>
      </div>
    </>
  );
};

export default AdminPage;
