
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 ml-56 shadow-sm">
      
      <div className="flex items-center gap-4">
        <h3 className="text-xl font-semibold text-cyan-700">📊 Dashboard</h3>
      </div>

      
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">👋 Welcome</span>

        
        <Link to="/" className="text-2xl hover:text-cyan-700 cursor-pointer">
          🛒
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
