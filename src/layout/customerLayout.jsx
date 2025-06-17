
import React from "react";
import NavBar from "../pages/customer/navbar";
import Footer from "../pages/customer/footer";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
