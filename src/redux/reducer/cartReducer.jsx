import { createSlice } from "@reduxjs/toolkit";
import { ACCESSTOKEN, http, settings, USER_CART } from "../../util/config";
import { history } from "../../index";

const initialState = {
  cart: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addNewProductAction: (state, action) => {
      const itemCart = action.payload;
      const item = state.cart.find((sp) => sp.id === itemCart.id);
      if (item) {
        item.quantity = item.quantity + 1;
      } else {
        state.cart = [...state.cart, itemCart];
      }
    },
    changeQuantityAction: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((itemCart) => itemCart.id === id);
      item.quantity += quantity;
    },
    deleteProductAction: (state, action) => {
      const id = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },
    orderProductAction: (state, action) => {},
  },
});

export const {
  addNewProductAction,
  changeQuantityAction,
  deleteProductAction,
  orderProductAction,
} = cartReducer.actions;

export default cartReducer.reducer;
export const orderProductApi = (id, quantity, email) => {
  //Lấy 3 giá trị từ cart.jsx từ 99 -> 111 
  return async (dispatch) => {
    const result = await http.post("/api/Users/order", {
      orderDetail: [
        {
          productId: id,
          quantity: quantity,
        },
      ],
      email: email,
    });
    console.log("Order Submit: ", result);
  };
};
