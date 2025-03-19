import { Breadcrumb } from "antd";
import classNames from "classnames/bind";
import styles from "./ProductPage.module.scss";

import ProductList from "../../components/ProductList/ProductList";
import BoxWrapper from "../../components/BoxWrapper/BoxWrapper";

const cx = classNames.bind(styles);

const ProductPage = () => {
  return (
    <div className={cx("wrapper", "container")}>
      <Breadcrumb
        items={[
          {
            title: "Trang chủ",
          },
          {
            title: <a href="">Application Center</a>,
          },
          {
            title: <a href="">Application List</a>,
          },
          {
            title: "An Application",
          },
        ]}
      />
      <div className={cx("content")}>
        <div>
          <BoxWrapper />
          <BoxWrapper />
          <BoxWrapper />
        </div>
        <div>
          <ProductList col={4} gap={10} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
