import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Button, Form, Input, ConfigProvider } from "antd";
import classNames from "classnames/bind";
import styles from "./Contact.module.scss";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const onFinish = (values) => {
  console.log(values);
};

const cx = classNames.bind(styles);

const Contact = () => {
  return (
    <div className={cx("wrapper", "container")}>
      <Breadcrumb />
      <div className={cx("content")}>
        <div className={cx("contact")}>
          <h4>Liên hệ với chúng tôi</h4>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["user", "name"]}
              label="Họ tên"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ tên!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Vui lòng nhập email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={["user", "phone"]} label="Điện thoại">
              <Input />
            </Form.Item>
            <Form.Item
              name={["user", "content"]}
              label="Nội dung"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nội dung!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item label={null}>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultBg: "#503eb6",
                      defaultColor: "#fff",
                      defaultHoverColor: "#fff",
                      defaultHoverBg: "#ff901c",
                      defaultHoverBorderColor: "#ff901c",
                      defaultActiveBorderColor: "#ff901c",
                    },
                  },
                }}
              >
                <Button htmlType="submit">Gửi thông tin</Button>
              </ConfigProvider>
            </Form.Item>
          </Form>
        </div>
        <div className={cx("map")}>
          <iframe
            className={cx("map-iframe")}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.6406038721384!2d105.7767188750316!3d21.03685218061442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b578dfa25b%3A0xd35137394a981300!2sMobile%20Repair!5e1!3m2!1svi!2s!4v1742454110441!5m2!1svi!2s"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
