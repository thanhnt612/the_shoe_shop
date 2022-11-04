import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../util/config";

const initialState = {
  arrProductDefault: [
    {
      id: 1,
      name: "Adidas Prophere",
      alias: "adidas-prophere",
      price: 350,
      description:
        "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
      size: "[36,37,38,39,40,41,42]",
      shortDescription:
        "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
      quantity: 995,
      deleted: false,
      categories:
        '[{"id":"ADIDAS","category":"ADIDAS"},{"id":"MEN","category":"MEN"},{"id":"WOMEN","category":"WOMEN"}]',
      relatedProducts: "[2,3,5]",
      feature: true,
      image: "https://shop.cyberlearn.vn/images/adidas-prophere.png",
    },
  ],
  arrProduct: [],
  productDetail: {},
};

const svReducer = createSlice({
  name: "shoesReducer",
  initialState,
  reducers: {
    getDataProductAction: (state, action) => {
      let arrProduct = action.payload;
      state.arrProduct = arrProduct;
    },
  },
});

export const { getDataProductAction, } = svReducer.actions;
export default svReducer.reducer;

/*--------Async Action---------*/
export const getProductApi = () => {
  return async (dispatch) => {
    let result = await http.get("/api/Product");
    const action = getDataProductAction(result.data.content);
    dispatch(action);
  };
};