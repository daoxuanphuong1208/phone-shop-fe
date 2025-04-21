import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import * as OrderService from "../../services/OrderService";
import {
  setOrderInfo,
  removeAllOrderProduct,
} from "../../redux/slides/orderSlice";
import styles from "./CheckoutSuccess.module.scss";

const cx = classNames.bind(styles);

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xử lý...");
  const isProcessing = useRef(false);

  useEffect(() => {
    const processOrder = async () => {
      if (isProcessing.current) return;
      isProcessing.current = true;

      const responseCode = searchParams.get("vnp_ResponseCode");
      const orderRaw = localStorage.getItem("orderInfo");
      const order = orderRaw ? JSON.parse(orderRaw) : null;

      if (responseCode === "00" && order?.data && !order?.created) {
        try {
          const data = { ...order.data, isPaid: true, paidAt: new Date() };
          await OrderService.createOrder(data);
          dispatch(removeAllOrderProduct());
          setMessage("Thanh toán thành công!");
          localStorage.setItem(
            "orderInfo",
            JSON.stringify({ data, created: true })
          );
        } catch (error) {
          console.error("Tạo đơn thất bại:", error);
          setMessage("Thanh toán thất bại. Vui lòng thử lại.");
          isProcessing.current = false;
        }
      } else if (order?.created) {
        setMessage("Đơn hàng đã được ghi nhận.");
      } else {
        setMessage("Thanh toán thất bại hoặc bị hủy.");
      }
    };

    processOrder();
  }, [dispatch, navigate, searchParams]);

  return <h2 className={cx("message")}>{message}</h2>;
};

export default CheckoutSuccess;
