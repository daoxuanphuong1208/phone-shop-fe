import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ProductList from "../../components/ProductList/ProductList";

const SearchPage = () => {
  return (
    <div style={{ padding: "20px 0" }} className="container">
      <Breadcrumb />
      <ProductList col={5} gap={15} />
    </div>
  );
};

export default SearchPage;
