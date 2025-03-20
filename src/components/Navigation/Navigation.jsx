import { useNavigate } from "react-router";
import classNames from "classnames/bind";
import { Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";

import styles from "./Navigation.module.scss";
const cx = classNames.bind(styles);

//data config
const items = [
  {
    label: "1st menu item",
    key: "1",
  },
  {
    label: "2nd menu item",
    key: "2",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const Navigation = () => {
  //state
  let navigate = useNavigate();

  //handle
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  return (
    <nav className={cx("nav")}>
      <ul className={cx("nav-list")}>
        <li onClick={() => navigate("/")} className={cx("nav-item")}>
          Trang chủ
        </li>
        <li className={cx("nav-item")}>
          <Dropdown
            menu={{
              items,
              onClick,
            }}
          >
            <a onClick={() => navigate("/type")}>
              Sản phẩm <DownOutlined />
            </a>
          </Dropdown>
        </li>
        <li onClick={() => navigate("/news")} className={cx("nav-item")}>
          Tin tức
        </li>
        <li onClick={() => navigate("/contact")} className={cx("nav-item")}>
          Liên hệ
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
