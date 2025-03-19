import classNames from "classnames/bind";
import styles from "./ProductList.module.scss";

import CardProduct from "../CardProduct/CardProduct";

const cx = classNames.bind(styles);

const ProductList = (props) => {
  const { col, gap } = props;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${col}, 1fr)`,
        gap: `${gap}px`,
      }}
      className={cx("wrapper")}
    >
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
    </div>
  );
};

export default ProductList;
