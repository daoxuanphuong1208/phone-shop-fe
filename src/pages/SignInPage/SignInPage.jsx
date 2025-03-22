import { FacebookFilled, GooglePlusSquareFilled } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input } from "antd";
import classNames from "classnames/bind";
import styles from "./SignInPage.module.scss";
const cx = classNames.bind(styles);

const SignInPage = () => {
  const onFinish = (values) => {
    console.log("Values: ", values);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("form")}>
        <div className={cx("title")}>Đăng nhập</div>
        <Form
          name="signin"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
          }}
          onFinish={onFinish}
        >
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
                Đăng nhập
              </Button>
            </ConfigProvider>
          </Form.Item>
          <div className={cx("forgot-password")}>
            <a href="">Quên mật khẩu?</a>
            <a href="/sign-up">Đăng ký tại đây</a>
          </div>
          <div className={cx("footer-title")}>Hoặc đăng nhập bằng</div>
          <div className={cx("social-login")}>
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

export default SignInPage;
