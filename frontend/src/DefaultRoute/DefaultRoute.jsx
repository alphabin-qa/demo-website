import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function DefaultRoute() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default DefaultRoute;
