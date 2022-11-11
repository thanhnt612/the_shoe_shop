import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ACCESSTOKEN, settings, USER_LOGIN } from "../../util/config";

export default function HeaderHome() {
  const { userProfile } = useSelector((state) => state.userReducer);
  const renderLogin = () => {
    console.log(userProfile);
    if (userProfile.name) {
      return (
        <>
          <NavLink className="nav-link bg-secondary rounded p-1" to="/profile">
            Hello <i class="fa-solid fa-hand"></i> ! {userProfile.name}
          </NavLink>
          <button
            className="nav-link text-white mx-2 bg-secondary rounded p-1"
            style={{ background: "none", border: "none" }}
            onClick={() => {
              settings.eraseCookie(ACCESSTOKEN, 0);
              localStorage.removeItem(USER_LOGIN);
              localStorage.removeItem(ACCESSTOKEN);
              window.location.href = "/login";
            }}
          >
            Đăng xuất <i class="fa-solid fa-circle-xmark"></i>
          </button>
        </>
      );
    }
    return <NavLink to="/login">Login</NavLink>;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <NavLink to="/home">
            <img src="../img/image 3.png" alt="logo" />
          </NavLink>
        </div>
        <div className="header-right">
          <div>
            <NavLink to="/search">
              <i className="text-light me-2 fa-solid fa-search" />
            </NavLink>
            <NavLink to="/search">
              <span>Search</span>
            </NavLink>
          </div>
          <NavLink to="/cart">
            <img src="../img/image 7.png" alt="Cart" />
          </NavLink>
          <span>(1)</span>
          {renderLogin()}
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
      <nav className="navbar navbar-expand-sm navbar-light bg-white">
        <div className="container">
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  to={"/"}
                  aria-current="page"
                >
                  Home <span className="visually-hidden">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item ms-2">
                <NavLink className="nav-link" to={"/"}>
                  Men
                </NavLink>
              </li>
              <li className="nav-item ms-2">
                <NavLink className="nav-link" to={"/"}>
                  Women
                </NavLink>
              </li>
              <li className="nav-item ms-2">
                <NavLink className="nav-link" to={"/"}>
                  Kid
                </NavLink>
              </li>
              <li className="nav-item ms-2">
                <NavLink className="nav-link" to={"/"}>
                  Sport
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
