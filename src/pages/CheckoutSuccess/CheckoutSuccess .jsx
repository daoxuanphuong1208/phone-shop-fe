import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Result, Button } from "antd";
import * as OrderService from "../../services/OrderService";
import { removeAllOrderProduct } from "../../redux/slides/orderSlice";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState("Đang xử lý...");
  const [status, setStatus] = useState("success");
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
          setStatus("success");
          setMessage("Thanh toán thành công!");
          localStorage.setItem(
            "orderInfo",
            JSON.stringify({ data, created: true })
          );
        } catch (error) {
          console.error("Tạo đơn thất bại:", error);
          setStatus("error");
          setMessage("Thanh toán thất bại. Vui lòng thử lại.");
          isProcessing.current = false;
        }
      } else if (order?.created) {
        setStatus("info");
        setMessage("Đơn hàng đã được ghi nhận.");
      } else {
        setStatus("error");
        setMessage("Thanh toán thất bại hoặc bị hủy.");
      }
    };

    processOrder();
  }, [dispatch, navigate, searchParams]);

  return (
    <div className="container">
      <Result
        status={status}
        title={message}
        extra={[
          <Button type="primary" key="home" onClick={() => navigate("/")}>
            Về trang chủ
          </Button>,
          status === "success" && (
            <Button key="orders" onClick={() => navigate("/my-order")}>
              Xem đơn hàng
            </Button>
          ),
        ]}
      />
    </div>
  );
};

export default CheckoutSuccess;
