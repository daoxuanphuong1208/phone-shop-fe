import classNames from "classnames/bind";
import styles from "./ProductList.module.scss";

import CardProduct from "../CardProduct/CardProduct";

const cx = classNames.bind(styles);

const ProductList = (props) => {
  const { col, gap, products } = props;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${col}, 1fr)`,
        gap: `${gap}px`,
      }}
      className={cx("wrapper")}
    >
      {products &&
        products.map((product, index) => (
          <CardProduct key={index} product={product} />
        ))}
    </div>
  );
};

export default ProductList;
