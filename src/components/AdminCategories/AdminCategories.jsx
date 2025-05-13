import {
  Button,
  Divider,
  Form,
  Modal,
  Input,
  message,
  Popconfirm,
  Space,
} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./AdminCategories.module.scss";
import Table from "../../components/Table/Table";
import { useState, useEffect, useRef } from "react";
import Loading from "../../components/Loading/Loading";
import * as CategoriesService from "../../services/CategoriesService";
import { useMutationHooks } from "../../hooks/useMutationHooks";

const cx = classNames.bind(styles);

const AdminCategories = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const deletingIdRef = useRef(null);
  const [categories, setCategories] = useState([]);

  const createMutation = useMutationHooks((data) =>
    CategoriesService.createCategory(data)
  );
  const updateMutation = useMutationHooks((data) =>
    CategoriesService.updateCategory(data.id, data.payload)
  );
  const deleteMutation = useMutationHooks((id) =>
    CategoriesService.deleteCategory(id)
  );

  const {
    data: createdData,
    isSuccess: isCreateSuccess,
    isPending: isCreating,
  } = createMutation;
  const { data: updatedData, isSuccess: isUpdateSuccess } = updateMutation;
  const { data: deletedData, isSuccess: isDeleteSuccess } = deleteMutation;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isCreateSuccess && createdData?.status === "OK") {
      messageApi.success("Thêm mới thành công!");
      setCategories((prev) => [...prev, createdData.data]);
      handleCancel();
    }

    if (isCreateSuccess && createdData?.status === "ERROR") {
      messageApi.error(createdData.message);
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isUpdateSuccess && updatedData?.status === "OK") {
      messageApi.success("Cập nhật thành công!");
      setCategories((prev) =>
        prev.map((item) =>
          item._id === updatedData.data._id ? updatedData.data : item
        )
      );
      handleCancel();
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isDeleteSuccess && deletedData?.status === "OK") {
      messageApi.success("Xóa thành công!");
      setCategories((prev) =>
        prev.filter((item) => item._id !== deletingIdRef.current)
      );
    }
  }, [isDeleteSuccess]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await CategoriesService.getAllCategories();
      setCategories(res?.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Lỗi lấy danh sách danh mục", err);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    setEditMode(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const handleAddCategory = async () => {
    try {
      const values = await form.validateFields();
      const payload = { ...values };
      createMutation.mutate(payload);
    } catch (error) {
      console.error("Lỗi validate:", error);
    }
  };

  const handleEditCategory = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        const payload = {
          ...values,
        };
        updateMutation.mutate({
          id: editingCategory._id,
          payload,
        });
      }
    } catch (error) {
      console.error("Lỗi validate:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingCategory(record);
    setEditMode(true);
    setIsModalOpen(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (id) => {
    deletingIdRef.current = id;
    deleteMutation.mutate(id);
  };

  const columns = [
    { title: "Tên", dataIndex: "name" },
    {
      title: "Hoạt động",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
            okText="Đồng ý"
            cancelText="Hủy bỏ"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        </Space>
      ),
    },
  ];

  return (
    <Loading isLoading={loading}>
      <div>
        {contextHolder}
        <div className={cx("header")}>
          <h2>Danh mục</h2>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            Thêm danh mục
          </Button>
        </div>
        <Modal
          width={800}
          title={editMode ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
          open={isModalOpen}
          onOk={editMode ? handleEditCategory : handleAddCategory}
          onCancel={handleCancel}
          confirmLoading={isCreating}
          okText={editMode ? "Cập nhật" : "Thêm danh mục"}
          cancelText="Hủy bỏ"
        >
          <Form form={form} name="form-category" layout="vertical">
            <Form.Item
              name="name"
              label="Tên danh mục"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input placeholder="Tên danh mục" />
            </Form.Item>
          </Form>
        </Modal>
        <Divider />
        {categories.length > 0 ? (
          <Table columns={columns} data={categories} pageSize={5} />
        ) : (
          <div>Không có dữ liệu</div>
        )}
      </div>
    </Loading>
  );
};

export default AdminCategories;
