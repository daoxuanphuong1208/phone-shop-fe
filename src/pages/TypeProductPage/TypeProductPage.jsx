import classNames from "classnames/bind";
import styles from "./TypeProductPage.module.scss";
import { Pagination } from "antd";

import ProductList from "../../components/ProductList/ProductList";
import BoxWrapper from "../../components/BoxWrapper/BoxWrapper";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
const onChange = (pageNumber) => {
  console.log("Page: ", pageNumber);
};

const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (searchProduct) {
          const res = await ProductService.getAllProduct({
            filter: "categoryId",
            search: searchProduct,
          });
          setProducts(res?.data || []);
        } else {
          const res = await ProductService.getAllProduct();
          setProducts(res?.data || []);
        }
      } catch (error) {
        console.error("Lỗi tìm kiếm sản phẩm:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchProduct]);

  return (
    <div className={cx("wrapper", "container")}>
      <Breadcrumb />
      <div className={cx("content")}>
        <div>
          <BoxWrapper titles={["A", "B", "C", "D", "E", "F"]} />
          <BoxWrapper titles={["A", "B", "C", "D", "E", "F"]} />
          <BoxWrapper titles={["A", "B", "C", "D", "E", "F"]} />
        </div>
        <div>
          <ProductList products={products} col={4} gap={10} />
        </div>
      </div>
      <Pagination
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
        showQuickJumper
        defaultCurrent={2}
        total={500}
        onChange={onChange}
      />
    </div>
  );
};

export default TypeProductPage;
