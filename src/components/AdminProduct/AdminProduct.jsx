import {
  Button,
  Divider,
  Form,
  Modal,
  Input,
  message,
  Popconfirm,
  Space,
  Image,
  Select,
  Upload,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import classNames from "classnames/bind";
import { getBase64 } from "../../utils";
import styles from "./AdminProduct.module.scss";
import Table from "../../components/Table/Table";
import { useState, useEffect, useRef } from "react";
import Loading from "../../components/Loading/Loading";
import * as ProductService from "../../services/ProductService";
import * as CategoriesService from "../../services/CategoriesService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import { Excel } from "antd-table-saveas-excel";
const cx = classNames.bind(styles);

const AdminProduct = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const deletingIdRef = useRef(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);

  const createMutation = useMutationHooks((data) =>
    ProductService.createProduct(data)
  );
  const updateMutation = useMutationHooks((data) =>
    ProductService.updateProduct(data.id, data.token, data.payload)
  );
  const deleteMutation = useMutationHooks(({ id, token }) =>
    ProductService.deleteProduct(id, token)
  );

  const {
    data: createdData,
    isSuccess: isCreateSuccess,
    isPending: isCreating,
  } = createMutation;
  const { data: updatedData, isSuccess: isUpdateSuccess } = updateMutation;
  const { data: deletedData, isSuccess: isDeleteSuccess } = deleteMutation;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isCreateSuccess && createdData?.status === "OK") {
      messageApi.success("Thêm sản phẩm thành công!");
      setProducts((prev) => [...prev, createdData.data]);
      handleCancel();
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isUpdateSuccess && updatedData?.status === "OK") {
      messageApi.success("Cập nhật sản phẩm thành công!");
      setProducts((prev) =>
        prev.map((item) =>
          item._id === updatedData.data._id ? updatedData.data : item
        )
      );
      handleCancel();
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isDeleteSuccess && deletedData?.status === "OK") {
      messageApi.success("Xóa sản phẩm thành công!");
      setProducts((prev) =>
        prev.filter((item) => item._id !== deletingIdRef.current)
      );
    }
  }, [isDeleteSuccess]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await ProductService.getAllProduct();
      const productsWithKey = res.data.map((item) => ({
        key: item._id,
        ...item,
      }));
      setProducts(productsWithKey);
    } catch (error) {
      messageApi.error("Lỗi khi tải sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await CategoriesService.getAllCategories();
      setCategories(res?.data || []);
    } catch (err) {
      console.error("Lỗi lấy danh sách danh mục", err);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    setEditMode(false);
    form.resetFields();

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    setImageBase64(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const handleAddProduct = async () => {
    try {
      const values = await form.validateFields();
      const payload = { ...values, image: imageBase64 };
      createMutation.mutate(payload);
    } catch (error) {
      console.error("Lỗi validate:", error);
    }
  };

  const handleEditProduct = async () => {
    try {
      const values = await form.validateFields();
      const token = JSON.parse(localStorage.getItem("access_token"));
      if (editingProduct) {
        const payload = {
          ...values,
          image: imageBase64 || editingProduct.image,
        };
        updateMutation.mutate({
          id: editingProduct._id,
          token,
          payload,
        });
      }
    } catch (error) {
      console.error("Lỗi validate:", error);
    }
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    setEditMode(true);
    setIsModalOpen(true);
    setImagePreview(record.image);
    setImageBase64(null);
    form.setFieldsValue(record);
  };

  const handleDelete = (id) => {
    const token = JSON.parse(localStorage.getItem("access_token"));
    deletingIdRef.current = id;
    deleteMutation.mutate({ id, token });
  };

  const handleChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file.originFileObj);
      setImagePreview(objectUrl);
      const base64 = await getBase64(file.originFileObj);
      setImageBase64(base64);
    }
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (url) => (
        <Image
          className={cx("image-product")}
          alt="product"
          src={url}
          width={100}
          height={100}
        />
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    { title: "Tên", dataIndex: "name" },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      render: (categoryId) => {
        const category = categories.find((c) => c._id === categoryId);
        return category ? category.name : "Không rõ";
      },
    },
    { title: "Giá", dataIndex: "price" },
    { title: "Số lượng", dataIndex: "countInStock" },
    { title: "Sao", dataIndex: "rating" },
    { title: "Mô tả", dataIndex: "description" },
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

  const handleExport = () => {
    const exportColumns = [
      { title: "Tên", dataIndex: "name" },
      { title: "Ảnh", dataIndex: "image" },
      { title: "Giá", dataIndex: "price" },
      { title: "Số lượng", dataIndex: "countInStock" },
      { title: "Đã bán", dataIndex: "quantitySold" },
      { title: "Giảm giá (%)", dataIndex: "discount" },
      { title: "Quà tặng", dataIndex: "gift" },
      { title: "Sao", dataIndex: "rating" },
      { title: "Mô tả", dataIndex: "description" },
      { title: "Trạng thái", dataIndex: "status" },
      { title: "Danh mục", dataIndex: "categoryName" },
      { title: "Màn hình", dataIndex: "screen_size" },
      { title: "Camera trước", dataIndex: "before_camera" },
      { title: "Camera sau", dataIndex: "after_camera" },
      { title: "Chip", dataIndex: "chipset" },
      { title: "RAM", dataIndex: "ram" },
      { title: "Bộ nhớ", dataIndex: "storage" },
      { title: "Pin", dataIndex: "battery" },
    ];

    const dataSource = products.map((item) => ({
      name: item.name,
      image: item.image,
      price: item.price,
      countInStock: item.countInStock,
      quantitySold: item.quantitySold,
      discount: item.discount,
      gift: item.gift,
      rating: item.rating,
      description: item.description,
      status: item.status,
      categoryName:
        categories.find((c) => c._id === item.categoryId)?.name || "Không rõ",
      screen_size: item.screen_size,
      before_camera: item.before_camera,
      after_camera: item.after_camera,
      chipset: item.chipset,
      ram: item.ram,
      storage: item.storage,
      battery: item.battery,
    }));

    const excel = new Excel();
    excel
      .addSheet("Sản phẩm")
      .addColumns(exportColumns)
      .addDataSource(dataSource)
      .saveAs("San_pham.xlsx");
  };

  return (
    <Loading isLoading={loading}>
      <div>
        {contextHolder}
        <div className={cx("header")}>
          <h2>Sản phẩm</h2>
          <div className={cx("actions")}>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
              Thêm sản phẩm
            </Button>
            <Button
              type="default"
              onClick={handleExport}
              icon={<ExportOutlined />}
            >
              Xuất excel
            </Button>
          </div>
        </div>
        <Modal
          width={800}
          title={editMode ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
          open={isModalOpen}
          onOk={editMode ? handleEditProduct : handleAddProduct}
          onCancel={handleCancel}
          confirmLoading={isCreating}
          okText={editMode ? "Cập nhật" : "Thêm sản phẩm"}
          cancelText="Hủy bỏ"
        >
          <Form form={form} name="form-product" layout="vertical">
            <Form.Item
              name="name"
              label="Tên sản phẩm"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input placeholder="Tên sản phẩm" />
            </Form.Item>

            <Form.Item label="Ảnh sản phẩm" required>
              <Upload
                accept="image/*"
                showUploadList={false}
                onChange={handleChangeImage}
                beforeUpload={() => false}
                maxCount={1}
              >
                <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
              </Upload>
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="product"
                  width={100}
                  height={100}
                  style={{ marginTop: 8 }}
                />
              )}
            </Form.Item>

            <Form.Item
              name="categoryId"
              label="Danh mục"
              rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
            >
              <Select placeholder="Danh mục">
                {categories.map((item) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="price"
              label="Giá"
              rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
            >
              <Input type="number" placeholder="Giá sản phẩm" />
            </Form.Item>

            <Form.Item
              name="countInStock"
              label="Số lượng"
              rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
            >
              <Input type="number" placeholder="Số lượng" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Tình trạng"
              rules={[
                { required: true, message: "Vui lòng nhập tình trạng máy!" },
              ]}
            >
              <Input type="string" placeholder="Tình trạng máy" />
            </Form.Item>

            <Form.Item name="discount" label="Giảm giá (%)">
              <Input type="number" placeholder="Phần trăm giảm giá" />
            </Form.Item>

            <Form.Item
              name="gift"
              label="Quà tặng"
              rules={[{ required: true, message: "Vui lòng nhập quà tặng!" }]}
            >
              <Input placeholder="Quà tặng kèm" />
            </Form.Item>

            <Form.Item
              name="rating"
              label="Sao đánh giá"
              rules={[{ required: true, message: "Vui lòng nhập sao!" }]}
            >
              <Input type="number" placeholder="Sao đánh giá (1 - 5)" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <Input.TextArea rows={4} placeholder="Mô tả sản phẩm" />
            </Form.Item>

            <Form.Item name="screen_size" label="Kích thước màn hình">
              <Input placeholder="6.5 inch, ..." />
            </Form.Item>

            <Form.Item name="before_camera" label="Camera trước">
              <Input placeholder="12MP, ..." />
            </Form.Item>

            <Form.Item name="after_camera" label="Camera sau">
              <Input placeholder="50MP + 12MP, ..." />
            </Form.Item>

            <Form.Item name="chipset" label="Chipset">
              <Input placeholder="Snapdragon 8 Gen 2, ..." />
            </Form.Item>

            <Form.Item name="ram" label="RAM">
              <Input placeholder="8GB, ..." />
            </Form.Item>

            <Form.Item name="storage" label="Bộ nhớ trong">
              <Input placeholder="128GB, 256GB, ..." />
            </Form.Item>

            <Form.Item name="battery" label="Dung lượng pin">
              <Input placeholder="5000mAh, ..." />
            </Form.Item>
          </Form>
        </Modal>
        <Divider />
        {products.length > 0 ? (
          <Table columns={columns} data={products} pageSize={5} />
        ) : (
          <div>Không có dữ liệu</div>
        )}
      </div>
    </Loading>
  );
};

export default AdminProduct;
