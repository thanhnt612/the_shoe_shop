import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartDefault:[{id: 1,
      name: "Adidas Prophere",
      image: "https://shop.cyberlearn.vn/images/adidas-prophere.png",
      price: 350,
      quantity:1,
      },
    ],
    arrCart: []
}

const cartReducer = createSlice({
  name: `cartReducer`,
  initialState,
  reducers: {
    
  }
});

export const {} = cartReducer.actions

export default cartReducer.reducer