import { Button, Divider, Form, Modal, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./AdminProduct.module.scss";
import Table from "../../components/Table/Table";
import { useState, useEffect } from "react";
import * as ProductService from "../../services/ProductService";

const cx = classNames.bind(styles);

const columns = [
  { title: "Tên", dataIndex: "name" },
  { title: "Loại", dataIndex: "type" },
  { title: "Giá", dataIndex: "price" },
];

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    let storeData = localStorage.getItem("access_token");
    let res;
    if (storeData) {
      res = await ProductService.getAllProduct(JSON.parse(storeData));
      res.data.map((item) => {
        return {
          key: item._id,
          ...item,
        };
      });
      setProducts(res.data);
    }

    return res;
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleAddProduct = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch("https://api.example.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (result.status === "OK") {
        messageApi.success("Thêm sản phẩm thành công!");
        setProducts([...products, result.product]);
        handleCancel();
      } else {
        messageApi.error("Lỗi khi thêm sản phẩm!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <div>
      {contextHolder}
      <div className={cx("header")}>
        <h2>Danh sách sản phẩm</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Thêm sản phẩm
        </Button>
      </div>
      <Modal
        title="Thêm sản phẩm"
        open={isModalOpen}
        onOk={handleAddProduct}
        onCancel={handleCancel}
      >
        <Form form={form} name="addProduct">
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}
          >
            <Input placeholder="Giá sản phẩm" />
          </Form.Item>
        </Form>
      </Modal>
      <Divider />
      {products.length > 0 ? (
        <Table columns={columns} data={products} />
      ) : (
        <div>Không có dữ liệu</div>
      )}
    </div>
  );
};

export default AdminProduct;
