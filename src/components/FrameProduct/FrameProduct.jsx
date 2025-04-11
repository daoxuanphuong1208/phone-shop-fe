import classNames from "classnames/bind";
import styles from "./FrameProduct.module.scss";
import { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import ProductList from "../ProductList/ProductList";

const cx = classNames.bind(styles);

const FrameProduct = ({ title, categoryId }) => {
  const [limit, setLimit] = useState(5);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const fetchProducts = async (currentLimit) => {
    try {
      const res = await ProductService.getAllProduct({
        limit: currentLimit,
        filter: "categoryId",
        search: categoryId,
      });
      if (res?.data) {
        setProducts(res.data);
        const total = res?.totalProduct;
        setHasMore(currentLimit < Math.min(total, 10));
      }
    } catch (err) {
      console.error("Lỗi lấy sản phẩm:", err);
    }
  };

  useEffect(() => {
    fetchProducts(limit);
  }, [limit]);

  const handleShowMore = () => {
    setLimit((prev) => Math.min(prev + 5, 10));
  };

  return (
    <section className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("label")}>Nổi bật</div>
        <div className={cx("model")}>
          <div>{title}</div>
        </div>
      </div>
      <div className={cx("product-list")}>
        <ProductList products={products} col={5} gap={15} />
      </div>
      {hasMore && (
        <div className={cx("show-more")}>
          <button className={cx("btn")} onClick={handleShowMore}>
            Xem thêm sản phẩm
          </button>
        </div>
      )}
    </section>
  );
};

export default FrameProduct;
