import React from "react";
import { NavLink } from "react-router-dom";

export default function HeaderHome() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-left">
          <NavLink to="/home">
            <img src="../img/image 3.png" alt="logo" />
          </NavLink>
        </div>
        <div className="header-right">
          <NavLink>
            <img src="../img/image 7.png" alt="Cart" />
          </NavLink>
          <span>(1)</span>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      </div>
    </header>
  );
}
