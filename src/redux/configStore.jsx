import { configureStore } from "@reduxjs/toolkit";
import shoesReducer from "./reducer/shoesReducer";
import userReducer from "./reducer/userReducer";

export const store = configureStore({
  reducer: {
    shoesReducer,
    userReducer
  },
});
