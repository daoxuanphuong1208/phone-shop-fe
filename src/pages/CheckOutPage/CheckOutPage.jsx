import {
  Form,
  Input,
  Select,
  Radio,
  Button,
  Image,
  ConfigProvider,
  message,
} from "antd";
import { DollarOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./CheckOutPage.module.scss";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHooks";

import * as OrderService from "../../services/OrderService";

const cx = classNames.bind(styles);

const CheckOutPage = () => {
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const mutation = useMutationHooks((data) => OrderService.createOrder(data));
  const { data, isSuccess, isPending } = mutation;

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [form] = Form.useForm();

  const totalPrice = useMemo(() => {
    return order?.orderItems.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
  }, [order?.orderItems]);

  const paymentMethod = Form.useWatch("paymentMethod", form);

  const feeShipping = useMemo(() => {
    if (paymentMethod === "online") return 0;
    if (!selectedProvince) return 30000;
    return selectedProvince.name?.toLowerCase().includes("hà nội")
      ? 10000
      : 30000;
  }, [selectedProvince, paymentMethod]);

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      messageApi.success("Đặt hàng thành công");
      // setTimeout(() => {
      //   navigate("/");
      // }, 2000);
    }
  }, [isSuccess]);

  const handleProvinceChange = (provinceCode) => {
    const selected = provinces.find((p) => p.code === provinceCode);
    setSelectedProvince(selected);

    fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data.districts);
        setWards([]);
        form.setFieldsValue({ district: undefined, ward: undefined });
      });
  };

  const handleDistrictChange = (districtCode) => {
    fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setWards(data.wards);
        form.setFieldsValue({ ward: undefined });
      });
  };

  const onFinish = (values) => {
    const { province, ...rest } = values;
    // if (
    //   user?.access_token &&
    //   order?.orderItems &&
    //   user?.name &&
    //   province &&
    //   user?.id &&
    //   totalPrice
    // ) {}
    mutation.mutate({
      token: user?.access_token,
      orderItems: order?.orderItems,
      city: province,
      shippingPrice: feeShipping,
      totalPrice: totalPrice + feeShipping,
      itemsPrice: totalPrice,
      user: user?.id,
      ...rest,
    });
  };

  return (
    <div className={cx("wrapper", "container")}>
      {contextHolder}
      <div
        onClick={() => {
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
      <div className={cx("content")}>
        <div className={cx("checkout-left")}>
          <Form
            className={cx("form")}
            form={form}
            layout="vertical"
            initialValues={{
              fullName: user?.name,
              phone: user?.phone,
              paymentMethod: "cod",
            }}
            onFinish={onFinish}
          >
            <div className={cx("checkout-info")}>
              <h4>Thông tin nhận hàng</h4>
              <Form.Item
                name="fullName"
                label="Họ và tên"
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
              >
                <Input placeholder="Nguyễn Văn A" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
              >
                <Input placeholder="0123456789" />
              </Form.Item>

              <Form.Item
                name="province"
                label="Tỉnh/Thành phố"
                rules={[{ required: true, message: "Chọn tỉnh/thành phố" }]}
              >
                <Select placeholder="Chọn tỉnh" onChange={handleProvinceChange}>
                  {provinces.map((province, index) => (
                    <Select.Option key={index} value={province.code}>
                      {province.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="district"
                label="Quận/Huyện"
                rules={[{ required: true, message: "Chọn quận/huyện" }]}
              >
                <Select
                  placeholder="Chọn huyện"
                  onChange={handleDistrictChange}
                >
                  {districts.map((district, index) => (
                    <Select.Option key={index} value={district.code}>
                      {district.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="ward"
                label="Phường/Xã"
                rules={[{ required: true, message: "Chọn xã/phường" }]}
              >
                <Select placeholder="Chọn xã">
                  {wards.map((ward, index) => (
                    <Select.Option key={index} value={ward.code}>
                      {ward.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="address"
                label="Địa chỉ chi tiết"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ chi tiết",
                  },
                ]}
              >
                <Input.TextArea placeholder="Số nhà, tên đường,..." />
              </Form.Item>
            </div>

            <div className={cx("checkout-payment")}>
              <h4>Hình thức thanh toán</h4>
              <Form.Item
                name="paymentMethod"
                rules={[
                  { required: true, message: "Chọn hình thức thanh toán" },
                ]}
              >
                <Radio.Group className={cx("payment-method")}>
                  <Radio value="cod">
                    Thanh toán khi nhận hàng <DollarOutlined />
                  </Radio>
                  <Radio value="online">
                    Thanh toán online <DollarOutlined />
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </Form>
        </div>

        <div className={cx("checkout-right")}>
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
                {Number(feeShipping).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>

            <div className={cx("order-total")}>
              <span>Tổng cộng:</span>
              <span>
                {Number(totalPrice + feeShipping).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>

            <div className={cx("submit-wrapper")}>
              <div
                className={cx("back-cart")}
                onClick={() => navigate("/cart")}
              >
                Quay lại giỏ hàng
              </div>

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
                  className={cx("order-submit")}
                  size="large"
                  block
                  onClick={() => form.submit()}
                >
                  Đặt hàng
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
