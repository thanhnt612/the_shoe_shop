import axios from "axios";
import { history } from "../index";
export const USER_LOGIN = "userLogin";
export const USER_PROFILE = "userProfile";
export const USER_CART = "userCart";
export const ACCESSTOKEN = "accessToken";

export const settings = {
  setStorageJson: (name, data) => {
    data = JSON.stringify(data);
    localStorage.setItem(name, data);
  },
  setStorage: (name, data) => {
    localStorage.setItem(name, data);
  },
  getStorageJson: (name) => {
    if (localStorage.getItem(name)) {
      const data = JSON.parse(localStorage.getItem(name));
      return data;
    }
    return; 
  },
  getStore: (name) => {
    if (localStorage.getItem(name)) {
      const data = localStorage.getItem(name);
      return data;
    }
    return; 
  },
  setCookieJson: (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    value = JSON.stringify(value);
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookieJson: (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0)
        return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return null;
  },
  setCookie: (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
};

export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsZXF1b2N0cmkxOTk0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlZJRVdfUFJPRklMRSIsIm5iZiI6MTY2Njg3MzUwOCwiZXhwIjoxNjY2ODc3MTA4fQ.rSuJ69pzHdJIz_ZvUipu_b8RvZWymE510uesHHGQKK4";
export const http = axios.create({
  baseURL: "https://shop.cyberlearn.vn",
});
//C???u h??nh cho request: Client g???i api ?????n server
http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      TokenCybersoft: TOKEN_CYBERSOFT,
      Authorization: "Bearer " + settings.getStore(ACCESSTOKEN),
    };

    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);
//c???u h??nh cho response: Server s??? tr??? d??? li???u v??? cho client
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //Th???t b???i c???a t???t c??? request s??? d???ng http s??? tr??? v??o ????y
    console.log(error);
    if (error.response?.status === 401) {
      // window.location.href = '/login';
      //Chuy???n h?????ng trang m?? kh??ng c???n reload l???i trang ????? gi??? ???????c c??c state hi???n t???i tr??n redux
      history.push("/login");
    }
    if (error.response?.status === 400 || error.response?.status === 404) {
      history.push("/");
    }
    return Promise.reject(error);
  }
);

