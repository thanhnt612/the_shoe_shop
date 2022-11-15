import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cartReducer";
import shoesReducer from "./reducer/shoesReducer";
import userReducer from "./reducer/userReducer";

export const store = configureStore({
  reducer: {
    shoesReducer,
    userReducer,
    cartReducer
  },
});
