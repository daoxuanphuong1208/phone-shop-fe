import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ProductList from "../../components/ProductList/ProductList";
import * as ProductService from "../../services/ProductService";
import Loading from "../../components/Loading/Loading";

const SearchPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchProduct) return;
      setLoading(true);
      try {
        const res = await ProductService.getAllProduct({
          filter: "name",
          search: searchProduct,
        });
        setProducts(res?.data || []);
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
    <>
      <Breadcrumb
        breadcrumFirst={{ label: "Tìm kiếm", href: "*", navigate: false }}
        breadcrumSecond={{
          label: searchProduct,
          href: "*",
          navigate: false,
        }}
      />
      <div style={{ padding: "20px 0" }} className="container">
        <Loading isLoading={loading} delay={1000}>
          {products === null ? null : products.length > 0 ? (
            <ProductList products={products} col={5} gap={15} />
          ) : (
            <h2>Không tìm thấy dữ liệu</h2>
          )}
        </Loading>
      </div>
    </>
  );
};

export default SearchPage;
