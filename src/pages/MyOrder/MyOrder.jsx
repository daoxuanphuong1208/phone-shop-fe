import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import styles from "./MyOrder.module.scss";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { message, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getAllOrders = async () => {
      if (user?.access_token) {
        const res = await OrderService.getAllOrders(user?.id);
        setOrders(res?.data || []);
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
    setConfirmLoading(true);
    try {
      const res = await OrderService.cancelOrder(selectedOrderId);
      if (res.status === "OK") {
        messageApi.success("Hủy đơn hàng thành công!");
        const newOrders = orders.filter(
          (order) => order._id !== selectedOrderId
        );
        setOrders(newOrders);
      } else {
        messageApi.error("Đã có lỗi xảy ra khi hủy đơn hàng.");
      }
    } catch (error) {
      messageApi.error("Không thể kết nối tới máy chủ.");
    } finally {
      setConfirmLoading(false);
      setOpen(false);
      setSelectedOrderId(null);
    }
  };

  return (
    <div className={cx("wrapper", "container")}>
      {contextHolder}
      <Breadcrumb
        breadcrumFirst={{
          label: "Đơn hàng của tôi",
        }}
      />
      {orders.length === 0 ? (
        <div className={cx("no-order")}>
          <h3>Bạn chưa có đơn hàng nào</h3>
        </div>
      ) : (
        orders.map((order) => (
          <div className={cx("order-card")} key={order._id}>
            <div className={cx("status")}>
              <h3>Trạng thái</h3>
              <div className={cx("shipping")}>
                Giao hàng:{" "}
                {order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}
              </div>
              <div className={cx("payment")}>
                Thanh toán: {order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
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
              {!order.isCanceled && (
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
  );
};

export default MyOrder;
