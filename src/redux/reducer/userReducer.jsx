import { createSlice } from '@reduxjs/toolkit'
import { ACCESSTOKEN, http, settings, USER_LOGIN } from '../../util/config';

const initialState = {
    userLogin : {
      
    }
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    loginAction: (state,action) => {
      const userLogin = action.payload;
      state.userLogin = userLogin;
    }
  }
});

export const {loginAction} = userReducer.actions

export default userReducer.reducer



export const loginApi = (userLogin) => {

  return async dispatch => {
    const result = await http.post(`/api/Users/signin`,userLogin);

    const action = loginAction(result.data.content);
    console.log(result)
    dispatch(action)
    settings.setStorageJson(USER_LOGIN, result.data.content);

    settings.setStorage(ACCESSTOKEN, result.data.content.accessToken);

    settings.setCookie(ACCESSTOKEN, result.data.content.accessToken, 30);
  }
}


export const loginFacebookApi = (tokenFBApp) => {
  return async dispatch => {
    const result = await http.post(`/api/Users/facebooklogin`, {facebookToken: tokenFBApp})
    const action = loginAction(result.data.content);
    dispatch(action);

    settings.setStorageJson(USER_LOGIN, result.data.content);

    settings.setStorage(ACCESSTOKEN, result.data.content.accessToken);

    settings.setCookie(ACCESSTOKEN, result.data.content.accessToken, 30);
  }
}