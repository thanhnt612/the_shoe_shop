import React from "react";
import { Outlet } from "react-router-dom";
import FooterHome from "../Component/FooterHome/FooterHome";
import HeaderHome from "../Component/HeaderHome/HeaderHome";

export default function HomeTemplates() {
  return (
    <div>
      <HeaderHome />
      <div className="container" style={{ minHeight: 800 }}>
        <Outlet />
      </div>
      <FooterHome />
    </div>
  );
}
