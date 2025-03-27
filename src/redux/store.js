import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlice.js";
import userReducer from "./slides/userSlice.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
