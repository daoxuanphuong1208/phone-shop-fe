// import {
//   Button,
//   Divider,
//   Form,
//   Modal,
//   Upload,
//   Image,
//   message,
//   Popconfirm,
//   Space,
//   Switch,
// } from "antd";
// import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
// import classNames from "classnames/bind";
// import styles from "./AdminSlider.module.scss";
// import Table from "../../components/Table/Table";
// import { useEffect, useRef, useState } from "react";
// import * as SliderService from "../../services/SliderService";
// import { useMutationHooks } from "../../hooks/useMutationHooks";
// import Loading from "../../components/Loading/Loading";
// import { getBase64 } from "../../utils";

// const cx = classNames.bind(styles);

// const AdminSlider = () => {
//   const [form] = Form.useForm();
//   const [sliders, setSliders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageBase64, setImageBase64] = useState(null);
//   const deletingIdRef = useRef(null);
//   const [status, setStatus] = useState(true);
//   const [messageApi, contextHolder] = message.useMessage();

//   const createMutation = useMutationHooks((data) =>
//     SliderService.createSlider(data)
//   );

//   const deleteMutation = useMutationHooks(({ id, token }) =>
//     SliderService.deleteSlider(id, token)
//   );

//   const {
//     data: createdData,
//     isSuccess: isCreateSuccess,
//     isPending: isCreating,
//   } = createMutation;

//   const { data: deletedData, isSuccess: isDeleteSuccess } = deleteMutation;

//   useEffect(() => {
//     fetchSliders();
//   }, []);

//   useEffect(() => {
//     if (isCreateSuccess && createdData?.status === "OK") {
//       messageApi.success("Thêm slider thành công!");
//       setSliders((prev) => [...prev, createdData.data]);
//       handleCancel();
//     }
//   }, [isCreateSuccess]);

//   useEffect(() => {
//     if (isDeleteSuccess && deletedData?.status === "OK") {
//       messageApi.success("Xóa slider thành công!");
//       setSliders((prev) =>
//         prev.filter((item) => item._id !== deletingIdRef.current)
//       );
//     }
//   }, [isDeleteSuccess]);

//   const fetchSliders = async () => {
//     setLoading(true);
//     try {
//       const res = await SliderService.getAllSliders();
//       const slidersWithKey = res.data.map((item) => ({
//         key: item._id,
//         ...item,
//       }));
//       setSliders(slidersWithKey);
//     } catch (error) {
//       messageApi.error("Lỗi khi tải slider");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//     setImageBase64(null);
//     setImagePreview(null);
//     form.resetFields();
//     setStatus(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setImageBase64(null);
//     setImagePreview(null);
//     form.resetFields();
//   };

//   const handleAddSlider = async () => {
//     try {
//       const values = await form.validateFields();
//       const payload = { ...values, image: imageBase64, status };
//       createMutation.mutate(payload);
//     } catch (error) {
//       console.error("Lỗi validate:", error);
//     }
//   };

//   const handleDelete = (id) => {
//     const token = JSON.parse(localStorage.getItem("access_token"));
//     deletingIdRef.current = id;
//     deleteMutation.mutate({ id, token });
//   };

//   const handleChangeImage = async ({ fileList }) => {
//     const file = fileList[0];
//     if (file) {
//       const objectUrl = URL.createObjectURL(file.originFileObj);
//       setImagePreview(objectUrl);
//       const base64 = await getBase64(file.originFileObj);
//       setImageBase64(base64);
//     }
//   };

//   const columns = [
//     {
//       title: "Ảnh",
//       dataIndex: "image",
//       render: (url) => (
//         <Image
//           className={cx("image-slider")}
//           width={200}
//           height={200}
//           alt="slider"
//           src={url}
//         />
//       ),
//     },
//     {
//       title: "Trạng thái",
//       dataIndex: "status",
//       render: (value) => (value ? "Hiển thị" : "Ẩn"),
//     },
//     {
//       title: "Hành động",
//       dataIndex: "action",
//       render: (_, record) => (
//         <Popconfirm
//           title="Bạn chắc chắn muốn xóa slider này?"
//           onConfirm={() => handleDelete(record._id)}
//           okText="Đồng ý"
//           cancelText="Hủy"
//         >
//           <Button danger icon={<DeleteOutlined />} />
//         </Popconfirm>
//       ),
//     },
//   ];

//   return (
//     <Loading isLoading={loading}>
//       {contextHolder}
//       <div className={cx("header")}>
//         <h2>Slider</h2>
//         <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
//           Thêm slider
//         </Button>
//       </div>
//       <Divider />
//       {sliders.length > 0 ? (
//         <Table columns={columns} data={sliders} />
//       ) : (
//         <div>Không có dữ liệu</div>
//       )}
//       <Modal
//         width={500}
//         title="Thêm slider"
//         open={isModalOpen}
//         onOk={handleAddSlider}
//         onCancel={handleCancel}
//         confirmLoading={isCreating}
//         okText="Thêm"
//         cancelText="Hủy"
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item label="Ảnh" required>
//             <Upload
//               accept="image/*"
//               showUploadList={false}
//               onChange={handleChangeImage}
//               beforeUpload={() => false}
//               maxCount={1}
//             >
//               <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
//             </Upload>
//             {imagePreview && (
//               <Image
//                 src={imagePreview}
//                 alt="slider"
//                 width={200}
//                 height={200}
//                 preview={false}
//                 className={cx("image-preview")}
//                 style={{ marginTop: 8 }}
//               />
//             )}
//           </Form.Item>
//           <Form.Item label="Hiển thị">
//             <Switch
//               checked={status}
//               onChange={(checked) => setStatus(checked)}
//             />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Loading>
//   );
// };

// export default AdminSlider;

import {
  Button,
  Divider,
  Form,
  Modal,
  Upload,
  Image,
  message,
  Popconfirm,
  Switch,
} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./AdminSlider.module.scss";
import Table from "../../components/Table/Table";
import { useEffect, useRef, useState } from "react";
import * as SliderService from "../../services/SliderService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../../components/Loading/Loading";
import { getBase64 } from "../../utils";

const cx = classNames.bind(styles);

const AdminSlider = () => {
  const [form] = Form.useForm();
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingSlider, setEditingSlider] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const deletingIdRef = useRef(null);
  const [status, setStatus] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const createMutation = useMutationHooks((data) =>
    SliderService.createSlider(data)
  );
  const updateMutation = useMutationHooks(({ id, payload }) =>
    SliderService.updateSlider(id, payload)
  );
  const deleteMutation = useMutationHooks((id) =>
    SliderService.deleteSlider(id)
  );

  const {
    data: createdData,
    isSuccess: isCreateSuccess,
    isPending: isCreating,
  } = createMutation;

  const { data: updatedData, isSuccess: isUpdateSuccess } = updateMutation;
  const { data: deletedData, isSuccess: isDeleteSuccess } = deleteMutation;

  useEffect(() => {
    fetchSliders();
  }, []);

  useEffect(() => {
    if (isCreateSuccess && createdData?.status === "OK") {
      messageApi.success("Thêm slider thành công!");
      setSliders((prev) => [...prev, createdData.data]);
      handleCancel();
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isUpdateSuccess && updatedData?.status === "OK") {
      messageApi.success("Cập nhật slider thành công!");
      setSliders((prev) =>
        prev.map((item) =>
          item._id === updatedData.data._id ? updatedData.data : item
        )
      );
      handleCancel();
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (isDeleteSuccess && deletedData?.status === "OK") {
      messageApi.success("Xóa slider thành công!");
      setSliders((prev) =>
        prev.filter((item) => item._id !== deletingIdRef.current)
      );
    }
  }, [isDeleteSuccess]);

  const fetchSliders = async () => {
    setLoading(true);
    try {
      const res = await SliderService.getAllSliders();
      const slidersWithKey = res.data.map((item) => ({
        key: item._id,
        ...item,
      }));
      setSliders(slidersWithKey);
    } catch (error) {
      messageApi.error("Lỗi khi tải slider");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    setEditMode(false);
    form.resetFields();
    setImageBase64(null);
    setImagePreview(null);
    setStatus(true);
  };

  const showEditModal = (slider) => {
    setIsModalOpen(true);
    setEditMode(true);
    setEditingSlider(slider);
    form.setFieldsValue({ status: slider.status });
    setImagePreview(slider.image);
    setStatus(slider.status);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditMode(false);
    setEditingSlider(null);
    setImageBase64(null);
    setImagePreview(null);
    form.resetFields();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const token = JSON.parse(localStorage.getItem("access_token"));
      const payload = {
        ...values,
        image: imageBase64 || editingSlider?.image,
        status,
      };
      if (editMode && editingSlider) {
        updateMutation.mutate({ id: editingSlider._id, payload });
      } else {
        createMutation.mutate(payload);
      }
    } catch (error) {
      console.error("Lỗi validate:", error);
    }
  };

  const handleDelete = (id) => {
    deletingIdRef.current = id;
    deleteMutation.mutate(id);
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
          className={cx("image-slider")}
          width={200}
          height={200}
          alt="slider"
          src={url}
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value) => (value ? "Hiển thị" : "Ẩn"),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa slider này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button
            style={{ marginLeft: 8 }}
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          />
        </>
      ),
    },
  ];

  return (
    <Loading isLoading={loading}>
      {contextHolder}
      <div className={cx("header")}>
        <h2>Slider</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Thêm slider
        </Button>
      </div>
      <Divider />
      {sliders.length > 0 ? (
        <Table columns={columns} data={sliders} />
      ) : (
        <div>Không có dữ liệu</div>
      )}
      <Modal
        width={500}
        title={editMode ? "Cập nhật slider" : "Thêm slider"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={handleCancel}
        confirmLoading={isCreating}
        okText={editMode ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Ảnh" required>
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
                alt="slider"
                width={200}
                height={200}
                preview={false}
                className={cx("image-preview")}
                style={{ marginTop: 8 }}
              />
            )}
          </Form.Item>
          <Form.Item label="Hiển thị">
            <Switch
              checked={status}
              onChange={(checked) => setStatus(checked)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Loading>
  );
};

export default AdminSlider;
