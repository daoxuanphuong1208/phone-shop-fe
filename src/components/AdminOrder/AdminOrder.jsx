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
import { DeleteOutlined, PrinterOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import * as OrderService from "../../services/OrderService";
import Loading from "../../components/Loading/Loading";
import { useReactToPrint } from "react-to-print";

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

  const fetchAddressNames = async (address) => {
    try {
      // Lấy dữ liệu từ API
      const res = await fetch("https://provinces.open-api.vn/api/?depth=3");
      const provinces = await res.json();

      // Tìm thành phố theo mã city
      const city = provinces.find(
        (province) => province.code === parseInt(address.city)
      );
      if (!city) {
        console.log("Không tìm thấy thành phố với code:", address.city);
      }

      // Tìm quận huyện theo mã district trong city
      const district = city?.districts.find(
        (district) => district.code === parseInt(address.district)
      );
      if (!district) {
        console.log("Không tìm thấy quận huyện với code:", address.district);
      }

      // Tìm phường theo mã ward trong district
      const ward = district?.wards.find(
        (ward) => ward.code === parseInt(address.ward)
      );
      if (!ward) {
        console.log("Không tìm thấy phường với code:", address.ward);
      }

      // Trả về tên địa chỉ hoặc "Không xác định" nếu không tìm thấy
      return {
        city: city?.name || "Không xác định",
        district: district?.name || "Không xác định",
        ward: ward?.name || "Không xác định",
      };
    } catch (error) {
      console.error("Lỗi khi lấy thông tin địa chỉ:", error);
      return {
        city: "Không xác định",
        district: "Không xác định",
        ward: "Không xác định",
      };
    }
  };

  const handlePrintOrder = async (order) => {
    const addressNames = await fetchAddressNames(order.shippingAddress);
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      messageApi.error("Trình duyệt chặn popup!");
      return;
    }
    const htmlContent = `
      <html>
        <head>
          <title>Hóa đơn bán hàng</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            .info, .customer-info { margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>HÓA ĐƠN BÁN HÀNG</h1>
          <div class="info">
            <div><strong>Mã đơn hàng:</strong> ${order._id}</div>
            <div><strong>Ngày tạo:</strong> ${new Date(
              order.createdAt
            ).toLocaleString()}</div>
          </div>
          <div class="customer-info">
            <h3>Thông tin khách hàng</h3>
            <p><strong>Họ tên:</strong> ${order.shippingAddress?.fullName}</p>
            <p><strong>Địa chỉ:</strong> ${order.shippingAddress?.address}, ${
      addressNames.ward
    }, ${addressNames.district}, ${addressNames.city}</p>
            <p><strong>Số điện thoại:</strong> ${
              order.shippingAddress?.phone
            }</p>
          </div>
          <h3>Danh sách sản phẩm</h3>
          <table>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              ${order.orderItems
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.amount}</td>
                  <td>${item.price.toLocaleString()}₫</td>
                  <td>${(item.price * item.amount).toLocaleString()}₫</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
          <h3 style="text-align:right;">Tổng tiền: ${order.totalPrice.toLocaleString()}₫</h3>
          <p style="text-align:right;">${
            order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
          }</p>
          <script>
            window.onload = () => {
              window.print();
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <Select
                value={orderStatus}
                onChange={(value) => handleStatusChange(record._id, value)}
                style={{ width: 150 }}
              >
                <Select.Option value="processing">Đang xử lý</Select.Option>
                <Select.Option value="shipped">Đã gửi hàng</Select.Option>
                <Select.Option value="delivered">Đã giao</Select.Option>
              </Select>
            </div>
          );
        }

        if (orderStatus === "delivered") {
          return (
            <Button
              type="default"
              onClick={() => {
                handlePrintOrder(record);
              }}
              icon={<PrinterOutlined />}
              style={{ marginLeft: 8 }}
            >
              In hóa đơn
            </Button>
          );
        }

        if (orderStatus === "cancelled") {
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
