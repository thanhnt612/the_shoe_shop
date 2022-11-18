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

export const loginApi = (userLogin) => {
  return async (dispatch) => {
    const result = await http.post(`/api/Users/signin`, userLogin);
    const action = loginAction(result.data.content);
    dispatch(action);
    history.push("/profile");
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
    console.log("get profile: ", result);
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
    const actionGetProfile = getProfileAction(result.data.content);
    dispatch(actionGetProfile);
    history.push("/login");
  };
};

export const updateApi = (userUpdate) => {
  return async (dispatch) => {
    const result = await http.post(`api/Users/updateProfile`, userUpdate);
    // console.log("update profile: ", result);
    // const action = loginAction(result.data.content);
    // dispatch(action);
    // const actionUpdate = getProfileAction(result.data.content);
    // dispatch(actionUpdate);
  };
};
