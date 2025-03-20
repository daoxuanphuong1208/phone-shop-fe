import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ProductList from "../../components/ProductList/ProductList";

const SearchPage = () => {
  return (
    <>
      <Breadcrumb />
      <div style={{ padding: "20px 0" }} className="container">
        <ProductList col={5} gap={15} />
      </div>
    </>
  );
};

export default SearchPage;
