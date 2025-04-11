import { FacebookFilled, GooglePlusSquareFilled } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, message } from "antd";
import classNames from "classnames/bind";
import styles from "./SignInPage.module.scss";
import { useNavigate } from "react-router";
import * as UserServices from "../../services/UserSevice";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlice";

const cx = classNames.bind(styles);

const SignInPage = () => {
  let navigate = useNavigate();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const mutation = useMutationHooks((data) => UserServices.loginUser(data));
  const { data, isPending, isSuccess } = mutation;
  const mutationForgot = useMutationHooks((data) =>
    UserServices.forgotPassword(data)
  );
  const {
    data: dataForgot,
    isPending: isPendingForgot,
    isSuccess: isSuccessForgot,
  } = mutationForgot;
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.status === "OK") {
      messageApi.success("Đăng nhập thành công");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
        if (decoded?.isAdmin) {
          setTimeout(() => navigate("/system/admin"), 1000);
        } else {
          setTimeout(() => navigate("/"), 1000);
        }
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (dataForgot?.status === "OK") {
      messageApi.success(dataForgot?.message);
      setIsForgotPassword(false);
    }
  }, [isSuccessForgot]);

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

  const handleSignin = (values) => {
    mutation.mutate({
      ...values,
    });
  };

  const handleForgotPassword = (values) => {
    mutationForgot.mutate({
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
          onFinish={handleSignin}
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
        </Form>
        <div className={cx("forgot-password")}>
          <span onClick={() => setIsForgotPassword(!isForgotPassword)}>
            Quên mật khẩu?
          </span>
          <span onClick={handleNavigateSignUp}>Đăng ký tại đây</span>
        </div>
        {isForgotPassword && (
          <Form
            name="forgot-password"
            initialValues={{
              remember: true,
            }}
            style={{
              maxWidth: 360,
            }}
            onFinish={handleForgotPassword}
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
                    Lấy lại mật khẩu
                  </Button>
                </Loading>
              </ConfigProvider>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
