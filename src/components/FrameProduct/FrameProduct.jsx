import classNames from "classnames/bind";
import styles from "./FrameProduct.module.scss";
import { Image } from "antd";

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
      <div className={cx("product-list")}></div>
    </section>
  );
};

export default FrameProduct;
