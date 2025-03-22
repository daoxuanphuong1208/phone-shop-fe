import classNames from "classnames/bind";
import styles from "./TypeProductPage.module.scss";
import { Pagination } from "antd";

import ProductList from "../../components/ProductList/ProductList";
import BoxWrapper from "../../components/BoxWrapper/BoxWrapper";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const cx = classNames.bind(styles);
const onChange = (pageNumber) => {
  console.log("Page: ", pageNumber);
};

const TypeProductPage = () => {
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
          <ProductList col={4} gap={10} />
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
