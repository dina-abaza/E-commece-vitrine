
import React from "react";
import NavBar from "../pages/customer/navbar";
import Footer from "../pages/customer/footer";
import { Outlet } from "react-router-dom";
import ChatWidget from "../components/customer/chatWedget";

const CustomerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow animate-slideInFromLeft">
        <Outlet />
      </main>

      <ChatWidget/>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
