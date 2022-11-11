import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import HomeTemplates from "./templates/HomeTemplates";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import Detail from "./pages/Detail/Detail";
import "./index.scss";
import Search from "./pages/Search/Search";
//Cấu hình History
import {
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplates />}>
          <Route index element={<Home />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="detail">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
          <Route path="*" element={<Navigate to={""} />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
