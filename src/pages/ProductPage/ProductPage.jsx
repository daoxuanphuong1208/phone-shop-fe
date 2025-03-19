import { Breadcrumb } from "antd";
import classNames from "classnames/bind";
import styles from "./ProductPage.module.scss";

import CardProduct from "../../components/CardProduct/CardProduct";
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
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          }}
        >
          <BoxWrapper />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
