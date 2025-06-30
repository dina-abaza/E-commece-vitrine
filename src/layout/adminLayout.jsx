
import React from "react";
import Sidebar from "../components/admin/sideBar";
import Navbar from "../components/admin/navBar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen">

      <Sidebar />

  
      <div className="md:ml-56 flex flex-col min-h-screen">
        
        <div>
          <Navbar />
        </div>

      
        <main className="flex-1 p-6 flex flex-col items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
