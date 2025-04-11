import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slides/productSlice.js";
import userReducer from "./slides/userSlice.js";

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
});
