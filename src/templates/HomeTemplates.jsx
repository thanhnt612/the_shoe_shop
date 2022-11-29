import React from "react";
import { Outlet } from "react-router-dom";
import FooterHome from "../Component/FooterHome/FooterHome";
import HeaderHome from "../Component/HeaderHome/HeaderHome";
import HeaderHome_Mobile from "../Component/HeaderHome/HeaderHome_Mobile";
import ResponsiveItem from "../pages/ResponsiveItem/ResponsiveItem";

export default function HomeTemplates() {
  return (
    <div>
      <ResponsiveItem
        component={HeaderHome}
        mobileComponent={HeaderHome_Mobile}
      />
      <div className="container" style={{ minHeight: 800 }}>
        <Outlet />
      </div>
      <FooterHome />
    </div>
  );
}
