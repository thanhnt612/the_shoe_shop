import { createSlice } from "@reduxjs/toolkit";
import {
  ACCESSTOKEN,
  http,
  settings,
  USER_LOGIN,
  USER_PROFILE,
} from "../../util/config";
import { history } from "../../index";

const initialState = {
  userLogin: settings.getStorageJson(USER_LOGIN)
    ? settings.getStorageJson(USER_LOGIN)
    : {},
  userProfile: settings.getStorageJson(USER_PROFILE)
    ? settings.getStorageJson(USER_PROFILE)
    : {},
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
      settings.setStorageJson(USER_PROFILE, state.userProfile);
    },
  },
});

export const { loginAction, getProfileAction } = userReducer.actions;

export default userReducer.reducer;

export const loginApi = (login) => {
  return async (dispatch) => {
    const result = await http.post(`/api/Users/signin`, login);
    const action = loginAction(result.data.content);
    dispatch(action);
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

export const registerApi = (register) => {
  return async (dispatch) => {
    const result = await http.post(`/api/Users/signup`, register);
  };
};
export const getProfileApi = () => {
  return async (dispatch) => {
    const result = await http.post("/api/Users/getProfile");
    const action = getProfileAction(result.data.content);
    dispatch(action);
  };
};

export const updateProfileApi = (update) => {
  return async (dispatch) => {
    const result = await http.post(`api/Users/updateProfile`, update);
    console.log("update profile: ", result);
    const actionGetProfile = getProfileApi();
    dispatch(actionGetProfile);
    alert("Lưu thông tin đã chỉnh sửa");
  };
};
