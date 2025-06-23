import React from "react";
import Sidebar from "../components/admin/sideBar";
import Navbar from "../components/admin/navBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <main className="animate-slideInFromLeft ml-56 mt-16 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
