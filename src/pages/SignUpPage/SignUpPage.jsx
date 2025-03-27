import { FacebookFilled, GooglePlusSquareFilled } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import classNames from "classnames/bind";
import styles from "./SignUpPage.module.scss";
import { useNavigate } from "react-router";
import axios from "axios";
import * as UserServices from "../../services/UserSevice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../../components/Loading/Loading";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const SignUpPage = () => {
  let navigate = useNavigate();
  const mutation = useMutationHooks((data) => UserServices.signUpUser(data));
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isPending, isSuccess } = mutation;

  //handle

  useEffect(() => {
    if (data?.status === "OK") {
      messageApi.success("Đăng ký thành công");
      setTimeout(() => handleNavigateSignIn, 1500);
    }
  }, [isSuccess]);

  const onFinish = (values) => {
    mutation.mutate({
      ...values,
    });
  };

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div className={cx("wrapper")}>
      {contextHolder}
      <div className={cx("form")}>
        <div className={cx("title")}>Đăng ký</div>
        <div className={cx("sub-title")}>
          Đã có tài khoản, đăng nhập{" "}
          <a onClick={handleNavigateSignIn}>tại đây</a>
        </div>
        <Form
          name="signup"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ tên!",
              },
            ]}
          >
            <Input placeholder="Họ tên" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số diện thoại!",
              },
            ]}
          >
            <Input placeholder="Số diện thoại" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <Input type="password" placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập xác nhận mật khẩu!",
              },
            ]}
          >
            <Input type="password" placeholder="Xác nhận mật khẩu" />
          </Form.Item>
          <div className={cx("error-message")}>
            {data?.status === "ERROR" ? data?.message : ""}
          </div>
          <Form.Item>
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
                  Đăng ký
                </Button>
              </Loading>
            </ConfigProvider>
          </Form.Item>
          <div className={cx("footer-title")}>Hoặc đăng ký bằng</div>
          <div className={cx("social-register")}>
            <div className={cx("facebook")}>
              <FacebookFilled />
              <span>Facebook</span>
            </div>
            <div className={cx("google")}>
              <GooglePlusSquareFilled />
              <span>Google</span>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
