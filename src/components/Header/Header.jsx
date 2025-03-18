import { useState } from "react";
import classNames from "classnames/bind";
import { Image, Input, Button, ConfigProvider, Dropdown } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  SearchOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
const cx = classNames.bind(styles);
const { Search } = Input;

// data config
const items = [
  {
    key: "1",
    label: "My Account",
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: "Profile",
    extra: "⌘P",
  },
  {
    key: "3",
    label: "Đơn hàng của tôi",
    extra: "⌘B",
  },
  {
    key: "4",
    label: "Settings",
    icon: <SettingOutlined />,
    extra: "⌘S",
  },
];

const Header = () => {
  // state
  const [isLogin, setIsLogin] = useState(true);

  // handle

  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#503eb6",
            hoverBorderColor: "#6a5acd",
          },
          Button: {
            defaultBg: "#503eb6",
            defaultHoverBg: "#ff901c",
            defaultHoverBorderColor: "#ff901c",
            defaultActiveBorderColor: "#ff901c",
          },
        },
      }}
    >
      <header className={cx("header", "container")}>
        <div
          onClick={() => (window.location.href = "/")}
          className={cx("header-logo")}
        >
          <Image
            width={50}
            height={50}
            className={cx("img")}
            preview={false}
            src={logo}
            alt="logo"
          />
          <div>
            Duy Minh <span>Mobile</span>
          </div>
        </div>
        <div className={cx("header-search")}>
          <Search
            placeholder="Bạn muốn tìm gì?"
            allowClear
            enterButton={
              <Button>
                <SearchOutlined className={cx("icon")} />
              </Button>
            }
            size="large"
          />
        </div>
        <div className={cx("header-actions")}>
          <div className={cx("cart")}>
            <ShoppingOutlined className={cx("icon")} />
            <span className={cx("count")}>0</span>
          </div>
          <div className={cx("account")}>
            {isLogin ? (
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <div className={cx("avatar-wrapper")}>
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                      width={28}
                      height={28}
                      className={cx("avatar")}
                      preview={false}
                    />
                    <div>
                      <span>Đào Xuân Phượng</span> <DownOutlined />
                    </div>
                  </div>
                </a>
              </Dropdown>
            ) : (
              <div className={cx("login-wrapper")}>
                <UserOutlined className={cx("icon")} />
                <div>
                  <div>Đăng ký</div>
                  <div>Đăng nhập</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </ConfigProvider>
  );
};

export default Header;
