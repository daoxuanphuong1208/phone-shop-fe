import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems.find(
        (item) => item?.product === orderItem.product
      );
      if (itemOrder) {
        itemOrder.amount += orderItem.amount;
      } else {
        state.orderItems.push(orderItem);
      }
    },

    removeOrderProduct: (state, action) => {
      const { idProduct } = action.payload;
      state.orderItems = state.orderItems.filter(
        (item) => item.product !== idProduct
      );
    },

    removeAllOrderProduct: (state) => {
      state.orderItems = [];
    },
    setOrderInfo: (state, action) => {
      const { orderInfo } = action.payload;
      state.shippingAddress = orderInfo.shippingAddress;
      state.paymentMethod = orderInfo.paymentMethod;
      state.itemsPrice = orderInfo.itemsPrice;
      state.shippingPrice = orderInfo.shippingPrice;
      state.totalPrice = orderInfo.totalPrice;
      state.user = orderInfo.user;
    },
  },
});

export const {
  addOrderProduct,
  removeOrderProduct,
  removeAllOrderProduct,
  setOrderInfo,
} = orderSlice.actions;

export default orderSlice.reducer;
