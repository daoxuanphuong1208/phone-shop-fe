import { Button, Divider, message, Popconfirm, Space, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import Table from "../../components/Table/Table";
import Loading from "../../components/Loading/Loading";
import * as UsersService from "../../services/UserSevice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import classNames from "classnames/bind";
import styles from "./AdminUser.module.scss";

const cx = classNames.bind(styles);

const AdminUser = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const deletingIdRef = useRef(null);
  const [users, setUsers] = useState([]);

  const deleteMutation = useMutationHooks((id) => UsersService.deleteUser(id));
  const { data: deletedData, isSuccess: isDeleteSuccess } = deleteMutation;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isDeleteSuccess && deletedData?.status === "OK") {
      messageApi.success("Xóa người dùng thành công!");
      setUsers((prev) =>
        prev.filter((item) => item._id !== deletingIdRef.current)
      );
    }
  }, [isDeleteSuccess]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await UsersService.getAllUsers();
      const newUser = res?.data.filter((item) => !item.isAdmin);
      setUsers(newUser || []);
      setLoading(false);
    } catch (err) {
      console.error("Lỗi lấy danh sách người dùng", err);
    }
  };

  const handleDelete = (id) => {
    deletingIdRef.current = id;
    deleteMutation.mutate(id);
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "avatar",
      render: (value) => (
        <Image
          className={cx("image-user")}
          alt="avatar"
          src={value}
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
    },
    {
      title: "Thao tác",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Xác nhận xóa người dùng?"
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
      <div>
        {contextHolder}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Thành viên</h2>
        </div>
        <Divider />
        {users.length > 0 ? (
          <Table columns={columns} data={users} pageSize={5} />
        ) : (
          <div>Không có dữ liệu</div>
        )}
      </div>
    </Loading>
  );
};

export default AdminUser;
