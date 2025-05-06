import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./MyOrder.module.scss";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { message, Modal, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const cx = classNames.bind(styles);

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getAllOrders = async () => {
      setLoading(true);
      try {
        if (user?.access_token) {
          const res = await OrderService.getAllOrders(user?.id);
          setOrders(res?.data || []);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllOrders();
  }, [user?.id]);

  const showCancelModal = (orderId) => {
    setSelectedOrderId(orderId);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedOrderId(null);
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      const res = await OrderService.cancelOrder(selectedOrderId);
      if (res?.status === "OK") {
        messageApi.success(res.message || "Đã gửi yêu cầu hủy!");
        const updatedOrders = await OrderService.getAllOrders(user?.id);
        setOrders(updatedOrders?.data || []);
      } else {
        messageApi.warning(res.message || "Không thể hủy đơn hàng.");
      }
      setConfirmLoading(false);
    } catch (error) {
      messageApi.error("Lỗi gửi yêu cầu hủy đơn hàng");
    } finally {
      setConfirmLoading(false);
      setOpen(false);
      setSelectedOrderId(null);
    }
  };

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
        {contextHolder}
        <Breadcrumb
          breadcrumFirst={{
            label: "Đơn hàng của tôi",
          }}
        />
        {!loading && orders.length === 0 ? (
          <div className={cx("no-order")}>
            <h3>Bạn chưa có đơn hàng nào</h3>
          </div>
        ) : (
          orders.map((order) => (
            <div className={cx("order-card")} key={order._id}>
              <div className={cx("status")}>
                <div className={cx("shipping")}>
                  Trạng thái:{" "}
                  <Tag color={getOrderStatusTag(order).color}>
                    {getOrderStatusTag(order).text}
                  </Tag>
                </div>
                <div className={cx("payment")}>
                  Thanh toán:{" "}
                  <Tag color={getPaymentStatusTag(order).color}>
                    {getPaymentStatusTag(order).text}
                  </Tag>
                </div>
                {order.isCanceled && (
                  <div className={cx("canceled")}>Đơn hàng đã hủy</div>
                )}
              </div>

              {order.orderItems.map((item, index) => (
                <div className={cx("product")} key={index}>
                  <img src={item.image} alt={item.name} />
                  <div className={cx("name")}>{item.name}</div>
                  <div className={cx("price")}>
                    {(item.price * item.amount).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                </div>
              ))}
              <div className={cx("total")}>
                Tổng tiền:{" "}
                <span>
                  {order.totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>

              <div className={cx("actions")}>
                {(order.orderStatus === "pending" ||
                  order.orderStatus === "processing") && (
                  <button onClick={() => showCancelModal(order._id)}>
                    Hủy đơn hàng
                  </button>
                )}
                <button onClick={() => navigate(`/order-details/${order._id}`)}>
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))
        )}

        <Modal
          title="Hủy đơn hàng"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          okText="Đồng ý"
          cancelText="Hủy bỏ"
        >
          <p>Bạn có chắc muốn hủy đơn hàng?</p>
        </Modal>
      </div>
    </Loading>
  );
};

export default MyOrder;
