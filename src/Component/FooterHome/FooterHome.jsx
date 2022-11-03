import React from "react";
import { NavLink } from "react-router-dom";

export default function FooterHome() {
  return (
<div className="footer-bottom">
  <div className="container">
    <div className="row">
      <div className="col-4 footer-1">
        <h3>GET HELP</h3>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Nike</NavLink>
        <NavLink to="/">Adidas</NavLink>
        <NavLink to="/">Contact</NavLink>
      </div>
      <div className="col-4 footer-2">
        <h3>SUPPORT</h3>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Nike</NavLink>
        <NavLink to="/">Adidas</NavLink>
        <NavLink to="/">Contact</NavLink>
      </div>
      <div className="col-4 footer-3">
        <h3>REGISTER</h3>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </div>
  </div>
</div>

  );
}
