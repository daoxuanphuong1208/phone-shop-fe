import { Breadcrumb, ConfigProvider } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./Breadcrumb.module.scss";

const cx = classNames.bind(styles);

const BreadcrumbComponent = (props) => {
  const { breadcrumFirst, breadcrumSecond } = props;

  const items = [
    {
      title: (
        <a className={cx("link")} href="/">
          Trang chủ
        </a>
      ),
    },
  ];

  if (breadcrumFirst) {
    items.push({
      title: (
        <a href={breadcrumFirst.navigate ? breadcrumFirst.href : "#"}>
          {breadcrumFirst.label}
        </a>
      ),
    });
  }

  if (breadcrumSecond) {
    items.push({
      title: (
        <a href={breadcrumSecond.navigate ? breadcrumSecond.href : "#"}>
          {breadcrumSecond.label}
        </a>
      ),
    });
  }

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
        <Breadcrumb separator={<CaretRightOutlined />} items={items} />
      </ConfigProvider>
    </div>
  );
};

export default BreadcrumbComponent;
