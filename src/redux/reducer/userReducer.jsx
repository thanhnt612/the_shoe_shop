import { createSlice } from "@reduxjs/toolkit";
import { ACCESSTOKEN, http, settings, USER_LOGIN } from "../../util/config";

const initialState = {
  userLogin: settings.getStorageJson(USER_LOGIN)
    ? settings.getStorageJson(USER_LOGIN)
    : {},
  userProfile: {},
  userRegister: {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const userLogin = action.payload;
      state.userLogin = userLogin;
    },
    getProfileAction: (state, action) => {
      state.userProfile = action.payload;
    },
    // registerAction: (state, action) => {
    //   state.userLogin = action.payload;
    // },
  },
});

export const { loginAction, getProfileAction, registerAction } =
  userReducer.actions;

export default userReducer.reducer;

export const loginApi = (userLogin) => {
  return async (dispatch) => {
    const result = await http.post(`/api/Users/signin`, userLogin);
    const action = loginAction(result.data.content);
    console.log(result);
    dispatch(action);
    //Tiếp tục gọi api và get profile
    const actionGetProfile = getProfileApi();
    dispatch(actionGetProfile);
    settings.setStorageJson(USER_LOGIN, result.data.content);
    settings.setStorage(ACCESSTOKEN, result.data.content.accessToken);
    settings.setCookie(ACCESSTOKEN, result.data.content.accessToken, 30);
  };
};

export const loginFacebookApi = (tokenFBApp) => {
  return async (dispatch) => {
    const result = await http.post(`/api/Users/facebooklogin`, {
      facebookToken: tokenFBApp,
    });
    const action = loginAction(result.data.content);
    dispatch(action);
    //Tiếp tục gọi api và get profile
    const actionGetProfile = getProfileApi();
    dispatch(actionGetProfile);
    settings.setStorageJson(USER_LOGIN, result.data.content);
    settings.setStorage(ACCESSTOKEN, result.data.content.accessToken);
    settings.setCookie(ACCESSTOKEN, result.data.content.accessToken, 30);
  };
};

export const getProfileApi = () => {
  return async (dispatch) => {
    const result = await http.post("/api/Users/getProfile");
    const action = getProfileAction(result.data.content);
    dispatch(action);
  };
};
export const registerApi = (userRegister) => {
  return async (dispatch) => {
    const result = await http.post(`/api/Users/signup`, userRegister);
    console.log(result);
    const action = loginAction(result.data.content);
    dispatch(action);
    settings.setStorageJson(USER_LOGIN, result.data.content);
    settings.setStorage(ACCESSTOKEN, result.data.content.accessToken);
    settings.setCookie(ACCESSTOKEN, result.data.content.accessToken, 30);
  };
};
