import classNames from "classnames/bind";
import styles from "./ProductPage.module.scss";

import ProductList from "../../components/ProductList/ProductList";
import BoxWrapper from "../../components/BoxWrapper/BoxWrapper";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const cx = classNames.bind(styles);

const ProductPage = () => {
  return (
    <div className={cx("wrapper", "container")}>
      <Breadcrumb />
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
