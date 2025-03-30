import { Table } from "antd";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import no_cart from "../../assets/images/no-cart.webp";
import product_cart from "../../assets/images/img_product_cart.webp";

const cx = classNames.bind(styles);

const columns = [
  {
    title: "Thông tin sản phẩm",
    dataIndex: "infor",
    key: "infor",
    render: (text) => (
      <span className={cx("product-infor")}>
        <img width={109} height={109} src={product_cart} alt="no cart" />
        <div className={cx("product-infor-content")}>
          {text}
          <button>Xóa</button>
        </div>
      </span>
    ),
  },
  {
    title: "Đơn giá",
    dataIndex: "price",
    key: "price",
    render: (text) => <span className={cx("price-hightlight")}>{text}</span>,
  },
  {
    title: "Số lượng",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "Thành tiền",
    key: "priceFinal",
    dataIndex: "priceFinal",
    render: (text) => <span className={cx("price-hightlight")}>{text}</span>,
  },
];
const data = [
  {
    key: "1",
    infor: "Apple iPhone 11 (64GB) - Xanh",
    price: `${"35.690.000"}₫`,
    count: "1",
    priceFinal: `${"35.690.000"}₫`,
  },
  {
    key: "2",
    infor: "Apple iPhone 11 (64GB) - Xanh",
    price: `${"35.690.000"}₫`,
    count: "1",
    priceFinal: `${"35.690.000"}₫`,
  },
];

const Cart = () => {
  let hasProduct = true;

  return (
    <div className={cx("wrapper", "container")}>
      <Breadcrumb />
      <h3 className={cx("heading")}>Giỏ hàng của bạn</h3>
      {hasProduct ? (
        <div className={cx("content")}>
          <Table pagination={false} columns={columns} dataSource={data} />
          <div className={cx("footer")}>
            <span className={cx("btn-return")}>Tiếp tục mua hàng</span>
            <div>
              <div className={cx("total")}>
                <h4>Tổng tiền</h4>
                <span className={cx("price-hightlight")}>35.690.000₫</span>
              </div>
              <button className={cx("btn-checkout")}>Thanh toán</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={cx("empty")}>
          <img src={no_cart} alt="no cart" />
          <span>Không có sản phẩm nào trong giỏ hàng của bạn</span>
        </div>
      )}
    </div>
  );
};

export default Cart;
