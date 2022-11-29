import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ACCESSTOKEN, settings, USER_PROFILE } from "../../util/config";

export default function HeaderHome() {
  const { cart } = useSelector((state) => state.cartReducer);
  const { userProfile } = useSelector((state) => state.userReducer);
  const renderLogin = () => {
    if (userProfile.name) {
      return (
        <div className="row pb-3">
          <div className="col-7">
            <NavLink
              className="text-warning nav-link bg-secondary rounded p-1"
              to="/profile"
            >
              Hello <i class="fa-solid fa-hand"></i> ! {userProfile.name}
            </NavLink>
          </div>
          <div className="col-5">
            <button
              className="nav-link text-white mx-2 bg-secondary rounded p-1"
              style={{ background: "none", border: "none" }}
              onClick={() => {
                settings.eraseCookie(ACCESSTOKEN, 0);
                localStorage.removeItem(USER_PROFILE);
                localStorage.removeItem(ACCESSTOKEN);
                window.location.href = "/login";
              }}
            >
              Đăng xuất <i class="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="row p-3 text-center d-flex justify-content-end">
        <div className="col-6">
          <NavLink className="nav-link bg-secondary rounded p-1" to="/login">
            Login
          </NavLink>
        </div>
        <div className="col-6">
          <NavLink className="nav-link bg-secondary rounded p-1" to="/register">
            Register
          </NavLink>
        </div>
      </div>
    );
  };

  return (
    <header className="header-mobile">
      <div className="container">
        <div className="row">
          <div className="header-left">
            <div className="row p-2 d-flex">
              <div className="col-4 icon">
                <NavLink to="/home">
                  <img src="../img/image 3.png" alt="logo" />
                </NavLink>
              </div>
              <div className="col-8 cart pt-2">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className="nav-item text-light px-5"
                  to={"cart"}
                >
                  <i className="fa fa-cart-plus"></i>({cart.length})-
                  {cart
                    .reduce((tt, itemCart, index) => {
                      return (tt += itemCart.quantity * itemCart.price);
                    }, 0)
                    .toLocaleString()}
                  $
                </NavLink>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="row">
              <div className="col-12">{renderLogin()}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="search-product rounded border border-info bg-light text-dark text-start my-3 p-2">
        <NavLink to="/search">
          <i className="text-dark me-2 fa-solid fa-search" />
          <span className="text-dark">Search</span>
        </NavLink>
      </div>
    </header>
  );
}
