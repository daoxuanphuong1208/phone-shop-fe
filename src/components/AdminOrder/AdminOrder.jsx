import {
  Table,
  Select,
  message,
  Divider,
  Tag,
  Button,
  Modal,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import * as OrderService from "../../services/OrderService";
import Loading from "../../components/Loading/Loading";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await OrderService.getAllOrdersByAdmin();
      setOrders(res?.data || []);
    } catch (error) {
      console.error("Lỗi lấy đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updatePayload =
        newStatus === "delivered"
          ? { status: newStatus, isPaid: true }
          : { status: newStatus };
      await OrderService.updateOrderStatus(id, updatePayload);
      messageApi.success("Cập nhật trạng thái thành công!");
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? {
                ...order,
                orderStatus: newStatus,
                ...(newStatus === "delivered" ? { isPaid: true } : {}),
              }
            : order
        )
      );
    } catch (error) {
      messageApi.error("Cập nhật trạng thái thất bại!");
    }
  };

  const handleAcceptCancel = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    setConfirmLoading(true);
    try {
      const res = await OrderService.updateOrderStatus(selectedOrder._id, {
        status: "cancelled",
        isPaid: false,
      });
      if (res?.status === "OK") {
        messageApi.success("Đơn hàng đã được hủy!");
        setOrders((prev) =>
          prev.map((order) =>
            order._id === selectedOrder._id
              ? {
                  ...order,
                  orderStatus: "cancelled",
                  cancelRequest: false,
                  isPaid: false,
                  refund: selectedOrder.isPaid,
                }
              : order
          )
        );
      } else {
        messageApi.error("Không thể hủy đơn hàng.");
      }
    } catch (error) {
      messageApi.error("Lỗi kết nối máy chủ.");
    } finally {
      setConfirmLoading(false);
      setIsModalOpen(false);
      setSelectedOrder(null);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await OrderService.deleteOrder(id);
      messageApi.success("Xóa đơn hàng thành công!");
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (error) {
      messageApi.error("Không thể xóa đơn hàng.");
    }
  };

  const getStatusTag = (status) => {
    const statusColors = {
      pending: "default",
      processing: "blue",
      shipped: "orange",
      delivered: "green",
      cancelled: "red",
    };

    const statusLabels = {
      pending: "Chờ xác nhận",
      processing: "Đang xử lý",
      shipped: "Đã gửi hàng",
      delivered: "Đã giao",
      cancelled: "Đã hủy",
    };

    return <Tag color={statusColors[status]}>{statusLabels[status]}</Tag>;
  };

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "shippingAddress",
      render: (address) => address?.fullName,
    },
    {
      title: "Sản phẩm",
      dataIndex: "orderItems",
      render: (items) => (
        <div>
          {items.map((item) => (
            <div key={item._id}>{item.name}</div>
          ))}
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (price) => `${price.toLocaleString()}₫`,
    },
    {
      title: "Trạng thái",
      dataIndex: "orderStatus",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Thanh toán",
      dataIndex: "isPaid",
      render: (_, record) => {
        if (record.orderStatus === "cancelled" && record.isRefunded) {
          return <Tag color="blue">Đã hoàn tiền</Tag>;
        }
        return record.isPaid ? (
          <Tag color="green">Đã thanh toán</Tag>
        ) : (
          <Tag color="red">Chưa thanh toán</Tag>
        );
      },
    },
    {
      title: "Yêu cầu hủy",
      dataIndex: "cancelRequest",
      render: (_, record) =>
        record.orderStatus === "cancelled" ? (
          <Tag color="red">Đã chấp nhận hủy</Tag>
        ) : record.cancelRequest ? (
          <Button type="primary" onClick={() => handleAcceptCancel(record)}>
            Chấp nhận hủy
          </Button>
        ) : (
          <span>Không</span>
        ),
    },
    {
      title: "Hoạt động",
      dataIndex: "updateStatus",
      render: (_, record) => {
        const { orderStatus } = record;

        if (orderStatus === "pending") {
          return (
            <Button
              type="primary"
              onClick={() => handleStatusChange(record._id, "processing")}
            >
              Xác nhận
            </Button>
          );
        }

        if (orderStatus === "processing" || orderStatus === "shipped") {
          return (
            <Select
              value={orderStatus}
              onChange={(value) => handleStatusChange(record._id, value)}
              style={{ width: 150 }}
            >
              <Select.Option value="processing">Đang xử lý</Select.Option>
              <Select.Option value="shipped">Đã gửi hàng</Select.Option>
              <Select.Option value="delivered">Đã giao</Select.Option>
            </Select>
          );
        }

        if (orderStatus === "delivered" || orderStatus === "cancelled") {
          return (
            <Popconfirm
              title="Bạn chắc chắn muốn xóa?"
              onConfirm={() => handleDeleteOrder(record._id)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button danger icon={<DeleteOutlined />} />
            </Popconfirm>
          );
        }

        return null;
      },
    },
  ];

  return (
    <Loading isLoading={loading}>
      {contextHolder}
      <h2>Quản lý đơn hàng</h2>
      <Divider />
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Xác nhận hủy đơn hàng"
        open={isModalOpen}
        onOk={handleModalOk}
        confirmLoading={confirmLoading}
        onCancel={handleModalCancel}
        okText="Đồng ý"
        cancelText="Hủy bỏ"
      >
        {selectedOrder?.isPaid ? (
          <>
            <p style={{ fontWeight: "bold" }}>
              Lưu ý: Đơn hàng này đã được thanh toán. Bạn cần hoàn tiền cho
              khách sau khi hủy.
            </p>
            <p>Xác nhận hủy đơn hàng?</p>
          </>
        ) : (
          <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
        )}
      </Modal>
    </Loading>
  );
};

export default AdminOrders;
