import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart:[]
}

const cartReducer = createSlice({
  name: `cartReducer`,
  initialState,
  reducers: {
    
  }
});

export const {} = cartReducer.actions

export default cartReducer.reducer