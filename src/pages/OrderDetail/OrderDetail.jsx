import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Loading from "../../components/Loading/Loading";
import styles from "./OrderDetail.module.scss";
import * as OrderService from "../../services/OrderService";
import { format } from "date-fns";
import { Tag } from "antd";

const cx = classNames.bind(styles);

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchOrder = async () => {
      try {
        const data = await OrderService.getOrderDetail(id);
        setOrder(data.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
      }
    };

    const fetchProvinces = async () => {
      try {
        const res = await fetch("https://provinces.open-api.vn/api/?depth=3");
        const data = await res.json();
        setProvinces(data);
      } catch (err) {
        console.error("Lỗi khi lấy tỉnh thành:", err);
      }
    };

    if (id) {
      fetchOrder();
      fetchProvinces();
    }
    setLoading(false);
  }, [id]);

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

  if (!order) return null;

  const getOrderStatusTag = (order) => {
    if (order.orderStatus === "cancelled") {
      return { text: "Đã hủy", color: "red" };
    }

    if (order.cancelRequest) {
      return { text: "Đã yêu cầu hủy", color: "orange" };
    }

    switch (order.orderStatus) {
      case "pending":
        return { text: "Chờ xác nhận", color: "geekblue" };
      case "processing":
        return { text: "Đang xử lý", color: "orange" };
      case "shipped":
        return { text: "Đã gửi hàng", color: "blue" };
      case "delivered":
        return { text: "Đã giao", color: "green" };
      default:
        return { text: "Không xác định", color: "default" };
    }
  };

  const getPaymentStatusTag = (order) => {
    if (order.isRefunded) {
      return { text: "Đã hoàn tiền", color: "blue" };
    }
    return order.isPaid
      ? { text: "Đã thanh toán", color: "green" }
      : { text: "Chưa thanh toán", color: "red" };
  };

  return (
    <Loading isLoading={loading}>
      <div className={cx("wrapper", "container")}>
        <Breadcrumb breadcrumFirst={{ label: "Chi tiết đơn hàng" }} />
        <h2 className={cx("title")}>Thông tin đơn hàng</h2>

        <div className={cx("status")}>
          <p>
            <strong>Trạng thái:</strong>{" "}
            <span>
              <Tag color={getOrderStatusTag(order).color}>
                {getOrderStatusTag(order).text}
              </Tag>
            </span>
          </p>
          <p>
            <strong>Thanh toán:</strong>{" "}
            <span>
              {
                <Tag color={getPaymentStatusTag(order).color}>
                  {getPaymentStatusTag(order).text}
                  {order.isPaid ?? (
                    <>
                      lúc{" "}
                      {format(new Date(order.paidAt), "dd/MM/yyyy HH:mm:ss")}
                    </>
                  )}
                </Tag>
              }
            </span>
          </p>
        </div>

        <div className={cx("section")}>
          <h3>Thông tin giao hàng</h3>
          <p>
            <strong>Người nhận:</strong> {order.shippingAddress.fullName}
          </p>
          <p>
            <strong>Địa chỉ:</strong>{" "}
            {`${order.shippingAddress.address}, ${getWardName(
              order.shippingAddress.ward
            )}, ${getDistrictName(
              order.shippingAddress.district
            )}, ${getProvinceName(order.shippingAddress.city)}`}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {order.shippingAddress.phone}
          </p>
        </div>

        <div className={cx("section")}>
          <h3>Phương thức thanh toán</h3>
          <p>
            {order.paymentMethod === "online"
              ? "Thanh toán online"
              : "Thanh toán khi nhận hàng"}
          </p>
        </div>

        <div className={cx("section")}>
          <h3>Sản phẩm</h3>
          {order.orderItems.map((item, index) => (
            <div key={index} className={cx("product")}>
              <img src={item.image} alt={item.name} />
              <div>
                <p>
                  <strong>{item.name}</strong>
                </p>
                <p>Số lượng: {item.amount}</p>
                <p>
                  Giá:{" "}
                  {Number(item.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className={cx("section", "summary")}>
          <h3>Tổng kết đơn hàng</h3>
          <p>
            Tạm tính:{" "}
            {Number(order.itemsPrice).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <p>
            Phí giao hàng:{" "}
            {Number(order.shippingPrice).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <p className={cx("total")}>
            Tổng tiền:{" "}
            {Number(order.totalPrice).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        </div>
      </div>
    </Loading>
  );
};

export default OrderDetail;
