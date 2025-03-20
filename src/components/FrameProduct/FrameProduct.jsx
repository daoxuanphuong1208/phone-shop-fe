import classNames from "classnames/bind";
import styles from "./FrameProduct.module.scss";

import ProductList from "../ProductList/ProductList";

const cx = classNames.bind(styles);

const FrameProduct = (props) => {
  const { title, products } = props;
  return (
    <section className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("label")}>Nổi bật</div>
        <div className={cx("model")}>
          <div>iPhone</div>
        </div>
      </div>
      <div className={cx("product-list")}>
        <ProductList col={5} gap={15} />
      </div>
      <div className={cx("show-more")}>
        <button className={cx("btn")}>Xem thêm sản phẩm</button>
      </div>
    </section>
  );
};

export default FrameProduct;
