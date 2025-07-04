
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      
      <button
        onClick={toggleSidebar}
        className="fixed top-2 left-2 z-[200] md:hidden text-gray-800"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      
      <div
        className={`
          fixed top-0 left-0 h-screen bg-gray-800 text-white p-5 z-50
          w-56 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="text-center text-cyan-400 text-2xl mb-6">🛒 Hello Admin</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="/admin/dashboard" onClick={closeSidebar} className={({ isActive }) => isActive ? "font-bold text-white" : "text-gray-300"}>
            🏠 Home
          </NavLink>
          <NavLink to="/admin/products" onClick={closeSidebar} className="text-gray-300 hover:text-white">
            📦 Products
          </NavLink>
          <NavLink to="/admin/add" onClick={closeSidebar} className="text-gray-300 hover:text-white">
            ➕ Add Product
          </NavLink>
          <NavLink to="/admin/orders" onClick={closeSidebar} className="text-gray-300 hover:text-white">
            🧾 Orders
          </NavLink>
          <NavLink to="/admin/users" onClick={closeSidebar} className="text-gray-300 hover:text-white">
            👥 Users
          </NavLink>
          <NavLink to="/admin/settings" onClick={closeSidebar} className="text-gray-300 hover:text-white">
            ⚙️ Settings
          </NavLink>
          <NavLink
            to="/admin/login"
            onClick={() => {
              localStorage.removeItem("isAdmin");
              closeSidebar();
            }}
            className="text-gray-300 hover:text-white"
          >
            🚪 Logout
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
