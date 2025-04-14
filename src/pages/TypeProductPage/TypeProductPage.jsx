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

const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 8,
    total: 0,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
      };

      if (searchProduct) {
        params.filter = "categoryId";
        params.search = searchProduct;
      }

      const res = await ProductService.getAllProduct(params);
      if (res?.status === "OK") {
        setProducts(res.data || []);
        setPagination((prev) => ({
          ...prev,
          total: res.totalProduct || 0,
        }));
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pagination.page, searchProduct]);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      page: 0,
    }));
  }, [searchProduct]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      page: page - 1,
    }));
  };

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
          {loading ? (
            <Loading />
          ) : (
            <ProductList products={products} col={4} gap={10} />
          )}
        </div>
      </div>
      <Pagination
        current={pagination.page + 1}
        pageSize={pagination.limit}
        total={pagination.total}
        onChange={handlePageChange}
        align="end"
      />
    </div>
  );
};

export default TypeProductPage;
