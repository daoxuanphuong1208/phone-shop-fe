import axios from "axios";

export const createPayment = async (amount, bankCode) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/payment/create`,
      {
        amount,
        bankCode,
      }
    );

    return res.data;
  } catch (err) {
    console.error("Lỗi tạo thanh toán", err);
  }
};
