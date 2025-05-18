import { ShoppingCartOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./CardProduct.module.scss";
import StarRating from "../StarRating/StarRating";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addOrderProduct } from "../../redux/slides/orderSlice";

const cx = classNames.bind(styles);

const CardProduct = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (product.countInStock === 0) {
    return null;
  }

  const handleAddToCart = () => {
    dispatch(
      addOrderProduct({
        orderItem: {
          name: product.name,
          amount: 1,
          image: product.image,
          price: product.price,
          product: product._id,
          countInStock: product.countInStock,
        },
      })
    );
  };

  return (
    <div className={cx("wrapper")}>
      <img
        onClick={() => navigate(`/product-details/${product._id}`)}
        className={cx("image")}
        src={product.image}
        alt="product"
      />
      <div className={cx("content")}>
        <span className={cx("sales")}>-{product.discount}%</span>
        <span className={cx("badge")}>{product.status}</span>
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
              {Number(
                product.price * (1 - product.discount / 100)
              ).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
          <div onClick={handleAddToCart} className={cx("cart-wrap")}>
            <ShoppingCartOutlined className={cx("cart-icon")} />
          </div>
        </div>
        <div className={cx("status")}>
          Đã bán {product.quantitySold}
          <span></span>
        </div>
        <div className={cx("gift")}>Tặng {product.gift}</div>
        <StarRating rating={product.rating} />
      </div>
    </div>
  );
};

export default CardProduct;
