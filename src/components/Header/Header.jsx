import { useNavigate } from "react-router";
import classNames from "classnames/bind";
import {
  Image,
  Input,
  Button,
  ConfigProvider,
  Dropdown,
  AutoComplete,
  message,
} from "antd";
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
import { useSelector, useDispatch } from "react-redux";
import * as UserServices from "../../services/UserSevice";
import * as ProductService from "../../services/ProductService";
import { resetUser } from "../../redux/slides/userSlice";
import { searchProduct } from "../../redux/slides/productSlice";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useDebounceHooks } from "../../hooks/useDebounce";

const cx = classNames.bind(styles);

const DEFAULT_AVATAR =
  "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=170667a&w=0&k=20&c=LPUo_WZjbXXNnF6ok4uQr8I_Zj6WUVnH_FpREg21qaY=";

const Header = ({ isHiddenSearch, isHiddenCart }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const debounceValue = useDebounceHooks(search, 1000);

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setLoading(false);
  }, [user?.name]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debounceValue) {
        setOptions([]);
        return;
      }

      try {
        const res = await ProductService.getAllProduct({
          filter: "name",
          search: debounceValue,
        });
        if (res?.data) {
          const newOptions = res.data.map((product) => ({
            value: product.name,
            label: (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Image
                  width={40}
                  height={40}
                  src={product.image}
                  alt={product.name}
                  style={{ objectFit: "cover" }}
                  preview={false}
                />
                <span>{product.name}</span>
                <span style={{ marginLeft: "auto", color: "#aaa" }}>
                  {product.price}₫
                </span>
              </div>
            ),
            id: product._id,
          }));
          setOptions(newOptions);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchSuggestions();
  }, [debounceValue]);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserServices.logoutUser();
    dispatch(resetUser());
    localStorage.removeItem("access_token");
    setLoading(false);
    navigate("/");
  };

  const handleSearch = async (value) => {
    setSearch(value);
  };

  const handleSubmitSearch = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      if (search.trim()) {
        return;
      }
      messageApi.warning("Vui lòng nhập thông tin tìm kiếm");
      return;
    }
    dispatch(searchProduct(trimmedValue));
    navigate("/search");
    setSearch("");
    setOptions([]);
  };

  const onSelect = (value, option) => {
    navigate(`/product-details/${option.id}`);
    setOptions([]);
    setSearch("");
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
        {contextHolder}
        <div
          onClick={() => {
            user?.isAdmin ? navigate("/system/admin") : navigate("/");
          }}
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

        {!isHiddenSearch && (
          <div className={cx("header-search")}>
            <AutoComplete
              popupMatchSelectWidth={567}
              style={{ width: "100%" }}
              options={options}
              onSelect={onSelect}
              onSearch={handleSearch}
              value={search}
            >
              <Input.Search
                size="large"
                placeholder="Bạn muốn tìm gì?"
                allowClear
                enterButton={
                  <Button>
                    <SearchOutlined className={cx("icon")} />
                  </Button>
                }
                onSearch={handleSubmitSearch}
              />
            </AutoComplete>
          </div>
        )}

        <div className={cx("header-actions")}>
          {isHiddenCart ? (
            <div className={cx("back-user-page")} onClick={() => navigate("/")}>
              Về trang khách hàng
            </div>
          ) : (
            <div onClick={() => navigate("/cart")} className={cx("cart")}>
              <ShoppingOutlined className={cx("icon")} />
              <span className={cx("count")}>{order?.orderItems?.length}</span>
            </div>
          )}
          <Loading isLoading={loading}>
            <div className={cx("account")}>
              {user.name || user.email ? (
                <Dropdown menu={{ items }}>
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
