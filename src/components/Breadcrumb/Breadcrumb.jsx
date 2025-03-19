import { Breadcrumb, ConfigProvider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./Breadcrumb.module.scss";
const cx = classNames.bind(styles);

const BreadcrumbComponent = () => {
  return (
    <div className={cx("wrapper", "container")}>
      <ConfigProvider
        theme={{
          components: {
            Breadcrumb: {
              linkColor: "red",
            },
          },
        }}
      >
        <Breadcrumb
          separator={<CaretRightOutlined />}
          items={[
            {
              title: "Trang chủ",
            },
            {
              title: (
                <a className={cx("link")} href="">
                  Application
                </a>
              ),
            },
          ]}
        />
      </ConfigProvider>
    </div>
  );
};

export default BreadcrumbComponent;
