import { FacebookFilled, GooglePlusSquareFilled } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input } from "antd";
import classNames from "classnames/bind";
import styles from "./SignUpPage.module.scss";
const cx = classNames.bind(styles);

const SignUpPage = () => {
  const onFinish = (values) => {
    console.log("Values: ", values);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("form")}>
        <div className={cx("title")}>Đăng ký</div>
        <div className={cx("sub-title")}>
          Đã có tài khoản, đăng nhập <a href="/sign-in">tại đây</a>
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
            name="username"
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
              <Button block type="primary" htmlType="submit">
                Đăng ký
              </Button>
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
