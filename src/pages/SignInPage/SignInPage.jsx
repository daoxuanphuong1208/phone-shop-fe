import {
  FacebookFilled,
  GooglePlusSquareFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import classNames from "classnames/bind";
import styles from "./SignInPage.module.scss";
import { useNavigate } from "react-router";
import * as UserServices from "../../services/UserSevice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../../components/Loading/Loading";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlice";

const cx = classNames.bind(styles);

const SignInPage = () => {
  let navigate = useNavigate();
  const mutation = useMutationHooks((data) => UserServices.loginUser(data));
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isPending, isSuccess } = mutation;
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.status === "OK") {
      messageApi.success("Đăng nhập thành công");
      localStorage.setItem("access_token", data?.access_token);
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
      setTimeout(() => navigate("/"), 1500);
    }
  }, [isSuccess]);

  //handle

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetailsUser(id, token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
      })
    );
  };
  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const onFinish = (values) => {
    mutation.mutate({
      ...values,
    });
  };

  return (
    <div className={cx("wrapper")}>
      {contextHolder}
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
                  Đăng nhập
                </Button>
              </Loading>
            </ConfigProvider>
          </Form.Item>
          <div className={cx("forgot-password")}>
            <a href="">Quên mật khẩu?</a>
            <a onClick={handleNavigateSignUp}>Đăng ký tại đây</a>
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
