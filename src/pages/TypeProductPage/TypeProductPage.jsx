import classNames from "classnames/bind";
import styles from "./TypeProductPage.module.scss";
import { Pagination, Checkbox } from "antd";

import ProductList from "../../components/ProductList/ProductList";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();

  const [priceFilter, setPriceFilter] = useState([]);
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

      if (priceFilter.length > 0) {
        params.priceFilter = priceFilter;
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
  }, [pagination.page, searchProduct, priceFilter]);

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

  const onChangePrice = (checkedValues) => {
    setPriceFilter(checkedValues);
  };

  const priceOptions = [
    { label: "Dưới 2 triệu", value: "under-2m" },
    { label: "2 - 5 triệu", value: "2m-5m" },
    { label: "5 - 10 triệu", value: "5m-10m" },
    { label: "Trên 10 triệu", value: "over-10m" },
  ];

  return (
    <Loading isLoading={loading}>
      <div className={cx("wrapper", "container")}>
        <Breadcrumb
          breadcrumFirst={{
            label: location.state?.category
              ? location.state.category
              : "Tất cả sản phẩm",
          }}
        />
        <div className={cx("content")}>
          <div className={cx("filter-container")}>
            <div className={cx("filter-item")}>
              <h4 className={cx("filter-title")}>CHỌN MỨC GIÁ</h4>
              <Checkbox.Group
                options={priceOptions}
                onChange={onChangePrice}
                className={cx("checkbox-group")}
              />
            </div>
          </div>
          <div>
            {products.length === 0 && !loading ? (
              <div className={cx("no-product")}>Không có sản phẩm nào</div>
            ) : (
              <ProductList products={products} col={4} gap={10} />
            )}
          </div>
        </div>
        {products.length > 0 && (
          <Pagination
            current={pagination.page + 1}
            pageSize={pagination.limit}
            total={pagination.total}
            onChange={handlePageChange}
            align="end"
          />
        )}
      </div>
    </Loading>
  );
};

export default TypeProductPage;
