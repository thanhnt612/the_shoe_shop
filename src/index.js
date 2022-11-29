import React from "react";
import ReactDOM from "react-dom/client";
import {
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import HomeTemplates from "./templates/HomeTemplates";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Login_Mobile from "./pages/Login/Login_Mobile";
import Register from "./pages/Register/Register";
import Register_Mobile from "./pages/Register/Register_Mobile";
import Cart from "./pages/Cart/Cart";
import Cart_Mobile from "./pages/Cart/Cart_Mobile";
import Profile from "./pages/Profile/Profile";
import Profile_Mobile from "./pages/Profile/Profile_Mobile";
import Detail from "./pages/Detail/Detail";
import Detail_Mobile from "./pages/Detail/Detail_Mobile";
import "./index.scss";
import Search from "./pages/Search/Search";
import Search_Mobile from "./pages/Search/Search_Mobile";
import ResponsiveItem from "./pages/ResponsiveItem/ResponsiveItem";
import Home_Mobile from "./pages/Home/Home_Mobile";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplates />}>
          <Route
            index
            element={
              <ResponsiveItem component={Home} mobileComponent={Home_Mobile} />
            }
          ></Route>
          <Route
            path="search"
            element={
              <ResponsiveItem
                component={Search}
                mobileComponent={Search_Mobile}
              />
            }
          ></Route>
          <Route
            path="login"
            element={
              <ResponsiveItem
                component={Login}
                mobileComponent={Login_Mobile}
              />
            }
          ></Route>
          <Route
            path="register"
            element={
              <ResponsiveItem
                component={Register}
                mobileComponent={Register_Mobile}
              />
            }
          ></Route>
          <Route path="cart" element={<ResponsiveItem
                component={Cart}
                mobileComponent={Cart_Mobile}
              />}></Route>
          <Route
            path="profile"
            element={
              <ResponsiveItem
                component={Profile}
                mobileComponent={Profile_Mobile}
              />
            }
          ></Route>
          <Route
            path="detail"
            element={
              <ResponsiveItem
                component={Detail}
                mobileComponent={Detail_Mobile}
              />
            }
          >
            <Route path=":id" element={<Detail />}></Route>
          </Route>
          <Route path="*" element={<Navigate to={""} />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);
