import { NavLink } from "react-router-dom";
import React from "react";
const Sidebar = () => {
  return (
    <div className="w-56 h-screen bg-gray-800 text-white p-5 fixed z-50">
      <h2 className="text-center text-cyan-400 text-2xl mb-6">🛒hello Admin</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "font-bold text-white" : "text-gray-300"}>🏠 home</NavLink>
        <NavLink to="/admin/products" className="text-gray-300 hover:text-white">📦 products</NavLink>
        <NavLink to="/admin/add" className="text-gray-300 hover:text-white">➕ add product</NavLink>
        <NavLink to="/admin/orders" className="text-gray-300 hover:text-white">🧾 orders</NavLink>
        <NavLink to="/admin/users" className="text-gray-300 hover:text-white">👥 users</NavLink>
        <NavLink to="/admin/settings" className="text-gray-300 hover:text-white">⚙️ settings</NavLink>
        <NavLink
          to="/admin/login"
          onClick={() => localStorage.removeItem("isAdmin")}
          className="text-gray-300 hover:text-white"
        >
          🚪 logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
