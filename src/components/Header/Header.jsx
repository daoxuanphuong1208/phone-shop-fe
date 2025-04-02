import { useNavigate } from "react-router";
import classNames from "classnames/bind";
import { Image, Input, Button, ConfigProvider, Dropdown } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  SearchOutlined,
  DownOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  ProductOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { useSelector } from "react-redux";
import * as UserServices from "../../services/UserSevice";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slides/userSlice";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";

const cx = classNames.bind(styles);
const { Search } = Input;
const DEFAULT_AVATAR =
  "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=170667a&w=0&k=20&c=LPUo_WZjbXXNnF6ok4uQr8I_Zj6WUVnH_FpREg21qaY=";

const Header = ({ isHiddenSearch, isHiddenCart }) => {
  // state
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setLoading(false);
  }, [user?.name]);

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
      type: "divider",
    },
    {
      key: "1",
      label: (
        <span onClick={() => navigate("/profile")}>Thông tin người dùng</span>
      ),
      icon: <InfoCircleOutlined />,
    },
    {
      type: "divider",
    },
    user?.isAdmin
      ? {
          key: "2",
          label: (
            <span onClick={() => navigate("/system/admin")}>
              Quản lý hệ thống
            </span>
          ),
          icon: <AppstoreOutlined />,
        }
      : {
          key: "2",
          label: <span>Đơn hàng của tôi</span>,
          icon: <ProductOutlined />,
        },
    {
      type: "divider",
    },
    {
      key: "3",
      label: <span onClick={handleLogout}>Đăng xuất</span>,
      icon: <LogoutOutlined />,
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
        {!isHiddenSearch && (
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
        )}
        <div className={cx("header-actions")}>
          {isHiddenCart ? (
            <div className={cx("back-user-page")} onClick={() => navigate("/")}>
              Về trang người dùng
            </div>
          ) : (
            <div onClick={() => navigate("/cart")} className={cx("cart")}>
              <ShoppingOutlined className={cx("icon")} />
              <span className={cx("count")}>0</span>
            </div>
          )}
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
                      <div className={cx("avatar")}>
                        <img
                          src={user?.avatar || DEFAULT_AVATAR}
                          alt="avatar"
                        />
                      </div>
                      <div>
                        <span>{userName || user.email}</span> <DownOutlined />
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
