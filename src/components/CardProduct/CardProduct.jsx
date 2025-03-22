import { Dropdown, message, Image } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./CardProduct.module.scss";
import product_1 from "../../assets/images/product_1.webp";

import StarRating from "../StarRating/StarRating";

const cx = classNames.bind(styles);

const CardProduct = () => {
  return (
    <div className={cx("wrapper")}>
      <img className={cx("image")} src={product_1} alt="product" />
      <div className={cx("content")}>
        <span className={cx("sales")}>-19%</span>
        <span className={cx("badge")}>Sản phẩm MỚI</span>
        <div className={cx("name")}>
          iPhone 14 Pro Max 512GB Chính hãng VN/A
        </div>
        <div className={cx("price-box")}>
          <div className={cx("price-wrap")}>
            <span className={cx("price")}>35.690.000₫</span>
            <span className={cx("compare-price")}>43.990.000₫</span>
          </div>
          <div className={cx("cart-wrap")}>
            <ShoppingCartOutlined className={cx("cart-icon")} />
          </div>
        </div>
        <div className={cx("status")}>
          Tình trạng: Mới 99%
          <span></span>
        </div>
        <div className={cx("gift")}>
          Tặng Sạc cáp nhanh 20w giới hạn trị giá 250k
        </div>
        <StarRating rating={4} />
      </div>
    </div>
  );
};

export default CardProduct;
