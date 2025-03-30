import { useNavigate } from "react-router";
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
import { useSelector } from "react-redux";
import * as UserServices from "../../services/UserSevice";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slides/userSlice";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";

const cx = classNames.bind(styles);
const { Search } = Input;

const Header = () => {
  // state
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // handle

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserServices.logoutUser();
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    setLoading(false);
  };

  const items = [
    {
      key: "1",
      label: <span>Cài đặt</span>,
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: <span>Thông tin người dùng</span>,
    },
    {
      key: "3",
      label: <span>Đơn hàng của tôi</span>,
    },
    {
      key: "4",
      label: <span onClick={handleLogout}>Đăng xuất</span>,
    },
  ];

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
        <div onClick={() => navigate("/")} className={cx("header-logo")}>
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
          <div onClick={() => navigate("/cart")} className={cx("cart")}>
            <ShoppingOutlined className={cx("icon")} />
            <span className={cx("count")}>0</span>
          </div>
          <Loading isLoading={loading}>
            <div className={cx("account")}>
              {user.name || user.email ? (
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
                        <span>{user.name || user.email}</span> <DownOutlined />
                      </div>
                    </div>
                  </a>
                </Dropdown>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  className={cx("login-wrapper")}
                >
                  <UserOutlined className={cx("icon")} />
                  <div>
                    <div>Đăng ký</div>
                    <div>Đăng nhập</div>
                  </div>
                </div>
              )}
            </div>
          </Loading>
        </div>
      </header>
    </ConfigProvider>
  );
};

export default Header;
