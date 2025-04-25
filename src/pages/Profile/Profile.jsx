import { useState, useEffect } from "react";
import { Button, Form, Input, Upload, message } from "antd";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import * as UserServices from "../../services/UserSevice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../../components/Loading/Loading";
import { updateUser } from "../../redux/slides/userSlice";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";

const cx = classNames.bind(styles);
const DEFAULT_AVATAR =
  "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=170667a&w=0&k=20&c=LPUo_WZjbXXNnF6ok4uQr8I_Zj6WUVnH_FpREg21qaY=";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [hasUpdated, setHasUpdated] = useState(false);
  const [form] = Form.useForm();
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar || DEFAULT_AVATAR
  );
  const [avatarBase64, setAvatarBase64] = useState(null);
  const dispatch = useDispatch();
  const mutation = useMutationHooks((data) => UserServices.updateUser(data));
  const { data, isPending, isSuccess } = mutation;
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form.setFieldsValue(user);
    if (isSuccess && data?.status === "OK" && !hasUpdated) {
      messageApi.success("Cập nhật thành công");
      setHasUpdated(true);
      handleGetDetailsUser(user?.id, user?.access_token);
    }
  }, [user, form, isSuccess]);

  const onFinish = (values) => {
    mutation.mutate({
      id: user.id,
      access_token: user?.access_token,
      ...values,
      avatar: avatarBase64 || avatarPreview,
    });
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetailsUser(id, token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
      })
    );
  };

  const handleChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file.originFileObj);
      setAvatarPreview(objectUrl);
      const base64 = await getBase64(file.originFileObj);
      setAvatarBase64(base64);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <>
      {user?.isAdmin ? <Header isHiddenSearch isHiddenCart /> : <Header />}
      {user?.isAdmin ? null : <Navigation />}
      {contextHolder}
      {user?.isAdmin ? null : <Breadcrumb />}
      <div className={cx("wrapper")}>
        <h2>Thông tin tài khoản</h2>
        <Loading isLoading={isPending}>
          <div className={cx("content")}>
            <div className={cx("avatar-wrap")}>
              <div>
                <img
                  className={cx("avatar")}
                  src={avatarPreview}
                  alt="avatar"
                />
              </div>
            </div>
            <Form
              form={form}
              name="infor-user"
              onFinish={onFinish}
              layout="vertical"
              style={{ maxWidth: 600 }}
            >
              <Form.Item label="Ảnh đại diện">
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  onChange={handleChangeAvatar}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
              </Form.Item>

              <Form.Item name="name" label="Tên người dùng">
                <Input />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
                <Input />
              </Form.Item>
              <Form.Item name="phone" label="Điện thoại">
                <Input />
              </Form.Item>
              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Loading>
      </div>
      {user?.isAdmin ? null : <Footer />}
    </>
  );
};

export default Profile;
