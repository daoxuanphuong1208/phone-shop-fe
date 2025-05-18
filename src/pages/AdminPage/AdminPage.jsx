import {
  ProductOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SlidersOutlined,
  AreaChartOutlined,
  SnippetsOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import classNames from "classnames/bind";
import styles from "./AdminPage.module.scss";
import Header from "../../components/Header/Header";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import AdminSlider from "../../components/AdminSlider/AdminSlider";
import AdminCategories from "../../components/AdminCategories/AdminCategories";
import AdminStatistical from "../../components/AdminStatistical/AdminStatistical";
import AdminContact from "../../components/AdminContact/AdminContact";

import { useState } from "react";

const cx = classNames.bind(styles);

const items = [
  {
    key: "1",
    label: "Thống kê",
    icon: <AreaChartOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Quản lý thành viên",
    icon: <UserOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "3",
    label: "Quản lý sản phẩm",
    icon: <ProductOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "4",
    label: "Quản lý đơn hàng",
    icon: <ShoppingCartOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "5",
    label: "Quản lý danh mục",
    icon: <SnippetsOutlined />,
  },
  {
    type: "divider",
  },
  {
    key: "6",
    label: "Quản lý slider",
    icon: <SlidersOutlined />,
  },
  {
    key: "7",
    label: "Quản lý liên hệ",
    icon: <ContactsOutlined />,
  },
];

const AdminPage = () => {
  const [keyCurrent, setKeyCurrent] = useState("1");

  const renderComponent = (key) => {
    switch (key) {
      case "1":
        return <AdminStatistical />;
      case "2":
        return <AdminUser />;
      case "3":
        return <AdminProduct />;
      case "4":
        return <AdminOrder />;
      case "5":
        return <AdminCategories />;
      case "6":
        return <AdminSlider />;
      case "7":
        return <AdminContact />;
      default:
        return <>Không có dữ liệu</>;
    }
  };
  const onClick = (e) => {
    setKeyCurrent(e.key);
  };

  return (
    <>
      <Header isHiddenSearch isHiddenCart />
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
