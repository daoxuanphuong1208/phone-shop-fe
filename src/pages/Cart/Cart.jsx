import { Table } from "antd";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import no_cart from "../../assets/images/no-cart.webp";
import { useSelector, useDispatch } from "react-redux";
import { removeOrderProduct } from "../../redux/slides/orderSlice";
import { DeleteOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const Cart = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const orderItems = order?.orderItems || [];

  const hasProduct = orderItems.length > 0;

  const totalPrice = orderItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );

  const columns = [
    {
      title: "Thông tin sản phẩm",
      dataIndex: "infor",
      key: "infor",
      render: (infor) => (
        <div className={cx("product-infor")}>
          <img width={109} height={109} src={infor.image} alt={infor.name} />
          <div className={cx("product-infor-content")}>
            <p>{infor.name}</p>
            <button
              className={cx("btn-remove")}
              onClick={() =>
                dispatch(removeOrderProduct({ idProduct: infor.id }))
              }
            >
              <DeleteOutlined /> Xoá
            </button>
          </div>
        </div>
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
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Thành tiền",
      key: "priceFinal",
      dataIndex: "priceFinal",
      render: (text) => <span className={cx("price-hightlight")}>{text}</span>,
    },
  ];

  const data = orderItems.map((item) => ({
    key: item.product,
    infor: {
      name: item.name,
      image: item.image,
      id: item.product,
    },
    price: `${(item?.price).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}`,
    amount: item.amount,
    priceFinal: `${(item?.price * item.amount).toLocaleString("vi-VN")}₫`,
  }));

  console.log(data);

  return (
    <div className={cx("wrapper", "container")}>
      <Breadcrumb />
      <h3 className={cx("heading")}>Giỏ hàng của bạn</h3>
      {hasProduct ? (
        <div className={cx("content")}>
          <Table pagination={false} columns={columns} dataSource={data} />
          <div className={cx("footer")}>
            <span className={cx("btn-return")}>Tiếp tục mua hàng</span>
            <div>
              <div className={cx("total")}>
                <h4>Tổng tiền</h4>
                <span className={cx("price-hightlight")}>
                  {totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
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
