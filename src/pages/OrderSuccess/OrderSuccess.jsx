import { Button, Image, ConfigProvider } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./OrderSuccess.module.scss";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slides/orderSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);

const OrderSuccess = () => {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  const getProvinceName = (code) => {
    return provinces.find((prov) => prov.code === Number(code))?.name || "";
  };

  const getDistrictName = (code) => {
    for (const province of provinces) {
      const district = province.districts.find((d) => d.code === Number(code));
      if (district) return district.name;
    }
    return "";
  };

  const getWardName = (code) => {
    for (const province of provinces) {
      for (const district of province.districts) {
        const ward = district.wards.find((w) => w.code === Number(code));
        if (ward) return ward.name;
      }
    }
    return "";
  };

  return (
    <div className={cx("wrapper", "container")}>
      <div
        onClick={() => {
          dispatch(removeAllOrderProduct());
          navigate("/");
        }}
        className={cx("logo")}
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
      <div className={cx("title")}>
        <CheckCircleOutlined className={cx("icon")} /> Cảm ơn bạn đã đặt hàng!
      </div>
      <span>
        Một email xác nhận đã được gửi tới {user?.email}.
        <br /> Xin vui lòng kiểm tra email của bạn
      </span>
      <div className={cx("content")}>
        <div className={cx("left")}>
          <h3>Thông tin mua hàng</h3>
          <p>
            <strong>Họ tên:</strong> {user?.name}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {user?.phone}
          </p>
          <p>
            <strong>Địa chỉ:</strong>{" "}
            {`${order?.shippingAddress?.address}, ${getWardName(
              order?.shippingAddress?.ward
            )}, ${getDistrictName(
              order?.shippingAddress?.district
            )}, ${getProvinceName(order?.shippingAddress?.city)}`}
          </p>

          <p>
            <strong>Phương thức thanh toán:</strong>{" "}
            {order?.paymentMethod === "online"
              ? "Thanh toán online"
              : "Thanh toán khi nhận hàng"}
          </p>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultBg: "#503eb6",
                  defaultHoverBg: "#ff901c",
                  defaultHoverBorderColor: "#ff901c",
                  defaultActiveBorderColor: "#ff901c",
                  defaultColor: "#fff",
                  defaultHoverColor: "#fff",
                },
              },
            }}
          >
            <Button
              className={cx("continue-shopping")}
              size="large"
              block
              onClick={() => {
                dispatch(removeAllOrderProduct());
                navigate("/");
              }}
            >
              Tiếp tục mua hàng
            </Button>
          </ConfigProvider>
        </div>
        <div className={cx("right")}>
          <div className={cx("order-summary")}>
            {order?.orderItems?.map((item, index) => (
              <div key={index} className={cx("order-item")}>
                <div className={cx("order-info")}>
                  <img
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                  />
                  <span className={cx("order-name")}>{item.name}</span>
                </div>
                <span className={cx("order-price")}>
                  {Number(item.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}{" "}
                  x {item.amount}
                </span>
              </div>
            ))}

            <div className={cx("order-fee")}>
              <span>Phí vận chuyển:</span>
              <span>
                {Number(order?.shippingPrice).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>

            <div className={cx("order-total")}>
              <span>Tổng cộng:</span>
              <span>
                {Number(
                  order?.totalPrice + order?.shippingPrice
                ).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
