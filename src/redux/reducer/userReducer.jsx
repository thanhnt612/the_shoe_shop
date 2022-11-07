import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userSignup : {}
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    signUpAction: (state,action) => {

    }
  }
});

export const {signUpAction} = userReducer.actions

export default userReducer.reducer