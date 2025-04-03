import { Button, ConfigProvider, Form, Input, message } from "antd";
import classNames from "classnames/bind";
import styles from "./ResetPassword.module.scss";
import { useNavigate, useSearchParams } from "react-router";
import * as UserServices from "../../services/UserSevice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../../components/Loading/Loading";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const ResetPassword = () => {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const mutation = useMutationHooks((data) => UserServices.resetPassword(data));
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isPending, isSuccess } = mutation;

  useEffect(() => {
    if (data?.status === "OK") {
      messageApi.success("Đặt lại mật khẩu thành công");
      setTimeout(() => navigate("/sign-in"), 1000);
    }
  }, [isSuccess]);

  const onFinish = (values) => {
    if (!token) {
      messageApi.error("Hết thời gian đặt lại mật khẩu");
      return;
    }

    mutation.mutate({ token, newPassword: values.newPassword }); // Gọi mutation để gửi yêu cầu
  };

  return (
    <div className={cx("wrapper")}>
      {contextHolder}
      <div className={cx("form")}>
        <div className={cx("title")}>Quên mật khẩu</div>
        <Form
          name="forgot-password"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
              },
            ]}
          >
            <Input type="password" placeholder="Mật khẩu mới" />
          </Form.Item>
          <Form.Item>
            <div className={cx("error-message")}>
              {data?.status === "ERROR" ? data?.message : ""}
            </div>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#503eb6",
                  borderRadius: 2,
                  colorBgContainer: "#f6ffed",
                },
              }}
            >
              <Loading isLoading={isPending}>
                <Button block type="primary" htmlType="submit">
                  Đặt lại mật khẩu
                </Button>
              </Loading>
            </ConfigProvider>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
