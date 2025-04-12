import { ShoppingCartOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./CardProduct.module.scss";
import StarRating from "../StarRating/StarRating";
import { useNavigate } from "react-router";

const cx = classNames.bind(styles);

const CardProduct = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className={cx("wrapper")}>
      <img
        onClick={() => navigate(`/product-details/${product._id}`)}
        className={cx("image")}
        src={product.image}
        alt="product"
      />
      <div className={cx("content")}>
        <span className={cx("sales")}>-19%</span>
        <span className={cx("badge")}>Sản phẩm MỚI</span>
        <div
          onClick={() => navigate(`/product-details/${product._id}`)}
          className={cx("name")}
        >
          {product.name}
        </div>
        <div className={cx("price-box")}>
          <div className={cx("price-wrap")}>
            <span className={cx("price")}>
              {Number(product.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <span className={cx("compare-price")}>
              {Number(product.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
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
        <StarRating rating={product.rating} />
      </div>
    </div>
  );
};

export default CardProduct;
