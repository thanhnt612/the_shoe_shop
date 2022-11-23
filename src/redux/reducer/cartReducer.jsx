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
    orderProductAction: (state, action) => {

    },
  },
});

export const { addNewProductAction, changeQuantityAction, orderProductAction } =
  cartReducer.actions;

export default cartReducer.reducer;
export const orderProductApi = () => {
  return async (dispatch) => {
    const result = await http.post("/api/Users/order");
  };
};
