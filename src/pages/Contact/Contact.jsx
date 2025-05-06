import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Button, Form, Input, ConfigProvider, message } from "antd";
import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import { useSelector } from "react-redux";
import * as ContactService from "../../services/ContactService";

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
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  },
};

const cx = classNames.bind(styles);

const Contact = () => {
  const user = useSelector((state) => state.user);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await ContactService.createContact(values);
      messageApi.success("Gửi liên hệ thành công!");
      form.resetFields();
    } catch (error) {
      console.error(error);
      messageApi.error("Gửi liên hệ thất bại. Vui lòng thử lại sau!");
    }
  };

  return (
    <div className={cx("wrapper", "container")}>
      {contextHolder}
      <Breadcrumb
        breadcrumFirst={{
          label: "Liên hệ",
        }}
      />
      <div className={cx("content")}>
        <div className={cx("contact")}>
          <h4>Liên hệ với chúng tôi</h4>
          <Form
            {...layout}
            name="contact-form"
            onFinish={onFinish}
            form={form}
            style={{ maxWidth: 600 }}
            validateMessages={validateMessages}
            initialValues={{
              name: user?.name || "",
              email: user?.email || "",
              phone: user?.phone || "",
            }}
          >
            <Form.Item
              name={"name"}
              label="Họ tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name={"email"}
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

            <Form.Item name={"phone"} label="Điện thoại">
              <Input />
            </Form.Item>

            <Form.Item
              name={"message"}
              label="Nội dung"
              rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3369.9176603178344!2d105.77247247471472!3d21.03747758748018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b61ea47963%3A0x34eb9c34d58cf6a1!2zMTAgxJAuIEjhu5MgVMO5bmcgTeG6rXUsIE1haSBE4buLY2gsIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1744445136215!5m2!1svi!2s"
            width="600px"
            height="450px"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
