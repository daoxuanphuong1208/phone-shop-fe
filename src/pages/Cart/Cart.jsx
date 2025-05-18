import { Table, InputNumber } from "antd";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import no_cart from "../../assets/images/no-cart.webp";
import { useSelector, useDispatch } from "react-redux";
import {
  updateOrderProductAmount,
  removeOrderProduct,
  removeAllOrderProduct,
} from "../../redux/slides/orderSlice";
import { DeleteOutlined } from "@ant-design/icons";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Cart = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const navigate = useNavigate();

  const orderItems = order?.orderItems || [];
  const hasProduct = orderItems.length > 0;

  const totalPrice = useMemo(() => {
    return orderItems.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
  }, [orderItems]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleChangeQuantity = (value, record) => {
    let newValue = value;

    if (!value || value < 1) {
      newValue = 1;
    } else if (value > record.countInStock) {
      newValue = record.countInStock;
    }

    dispatch(
      updateOrderProductAmount({
        idProduct: record.key,
        amount: newValue,
      })
    );
  };

  const handleBlurQuantity = (value, record) => {
    if (value < 1) {
      dispatch(
        updateOrderProductAmount({
          idProduct: record.key,
          amount: 1,
        })
      );
    } else if (value > record.countInStock) {
      dispatch(
        updateOrderProductAmount({
          idProduct: record.infor.id,
          amount: record.countInStock,
        })
      );
    }
  };

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
      render: (_, record) => (
        <div className={cx("count")}>
          <div
            className={cx("decrease")}
            onClick={() => {
              if (record.amount > 1) {
                dispatch(
                  updateOrderProductAmount({
                    idProduct: record.key,
                    amount: record.amount - 1,
                  })
                );
              }
            }}
          >
            -
          </div>
          <InputNumber
            className={cx("custom-input-number")}
            min={1}
            max={record.countInStock}
            value={record.amount}
            size="large"
            onChange={(value) => handleChangeQuantity(value, record)}
            onBlur={() => handleBlurQuantity(record.amount, record)}
            controls={false}
          />
          <div
            className={cx("increase")}
            onClick={() => {
              console.log(record);
              if (record.amount < record.countInStock) {
                dispatch(
                  updateOrderProductAmount({
                    idProduct: record.key,
                    amount: record.amount + 1,
                  })
                );
              }
            }}
          >
            +
          </div>
        </div>
      ),
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
    countInStock: item.countInStock,
    priceFinal: `${(item?.price * item.amount).toLocaleString("vi-VN")}₫`,
  }));

  console.log(data);

  return (
    <div className={cx("wrapper", "container")}>
      <Breadcrumb
        breadcrumFirst={{
          label: "Giỏ hàng",
        }}
      />
      <h3 className={cx("heading")}>Giỏ hàng của bạn</h3>
      {hasProduct ? (
        <div className={cx("content")}>
          <div
            onClick={() => dispatch(removeAllOrderProduct())}
            className={cx("btn-remove-all")}
          >
            <DeleteOutlined /> Xóa tất cả
          </div>
          <Table pagination={false} columns={columns} dataSource={data} />
          <div className={cx("footer")}>
            <span onClick={() => navigate("/")} className={cx("btn-return")}>
              Tiếp tục mua hàng
            </span>
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
              <button onClick={handleCheckout} className={cx("btn-checkout")}>
                Thanh toán
              </button>
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
