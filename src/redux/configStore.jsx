import { configureStore } from "@reduxjs/toolkit";
import shoesReducer from "./reducer/shoesReducer";

export const store = configureStore({
  reducer: {
    shoesReducer: shoesReducer,
  },
});
