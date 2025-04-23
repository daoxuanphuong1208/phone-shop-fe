import {
  Button,
  Divider,
  Modal,
  message,
  Popconfirm,
  Space,
  Table,
} from "antd";
import { EyeOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import Loading from "../../components/Loading/Loading";
import * as ContactService from "../../services/ContactService";
import { useMutationHooks } from "../../hooks/useMutationHooks";

const AdminContacts = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const deletingIdRef = useRef(null);

  const deleteMutation = useMutationHooks((id) =>
    ContactService.deleteContact(id)
  );

  const updateMutation = useMutationHooks(({ id, payload }) =>
    ContactService.updateContact(id, payload)
  );

  const { data: deletedData, isSuccess: isDeleteSuccess } = deleteMutation;
  const { data: updatedData, isSuccess: isUpdateSuccess } = updateMutation;

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (isDeleteSuccess && deletedData?.status === "OK") {
      messageApi.success("Xóa liên hệ thành công!");
      setContacts((prev) =>
        prev.filter((c) => c._id !== deletingIdRef.current)
      );
    }
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (isUpdateSuccess && updatedData?.status === "OK") {
      messageApi.success("Cập nhật trạng thái thành công!");
      setContacts((prev) =>
        prev.map((c) => (c._id === updatedData.data._id ? updatedData.data : c))
      );
    }
  }, [isUpdateSuccess]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await ContactService.getAllContacts();
      setContacts(res?.data || []);
    } catch (err) {
      console.error("Lỗi lấy danh sách liên hệ:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    deletingIdRef.current = id;
    deleteMutation.mutate(id);
  };

  const handleMarkAsRead = (record) => {
    updateMutation.mutate({ id: record._id, payload: { isRead: true } });
  };

  const columns = [
    { title: "Tên", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Điện thoại", dataIndex: "phone" },
    { title: "Nội dung", dataIndex: "message" },
    {
      title: "Trạng thái",
      dataIndex: "isRead",
      render: (isRead) => (isRead ? "Đã đọc" : "Chưa đọc"),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          {!record.isRead && (
            <Button
              icon={<CheckOutlined />}
              onClick={() => handleMarkAsRead(record)}
            >
              Đánh dấu là đã đọc
            </Button>
          )}
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Loading isLoading={loading}>
      {contextHolder}
      <h2>Liên hệ khách hàng</h2>
      <Divider />
      <Table
        columns={columns}
        dataSource={contacts}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
      />
    </Loading>
  );
};

export default AdminContacts;
