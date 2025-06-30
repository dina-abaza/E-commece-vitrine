
import React, { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from "react-router-dom"; 
import { MdDashboard } from "react-icons/md";
import useAuthStore from "../../store/customerStore/authStore";

export default function SearchNav() {
  const [lang, setLang] = useState('العربيه');
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();      
    navigate("/login");  
  }

  return (
    <div className="w-full bg-white p-4">
      {/* Container الأكبر ينظم layout حسب الشاشة */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">

        {/* اللوجو والبحث */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-5 flex-grow">

          {/* اللوجو */}
          <h1 className="flex items-center gap-2 text-yellow-500 flex-shrink-0">
            <Link to="/admin/login" title="Admin Login">
              <MdDashboard className="cursor-pointer hover:text-yellow-700" size={24} sm="size-30" />
            </Link>
            <Link to="/" className="text-xl sm:text-2xl font-bold">vitrine</Link>
          </h1>

          {/* البحث */}
          <div className="flex items-center border border-gray-300 rounded-md py-2 px-3 flex-grow min-w-0 max-w-full">
            <FiSearch className="text-gray-500 text-xl mr-2" />
            <input
              type="text" 
              placeholder="ابحث..." 
              className="flex-grow outline-none text-gray-700 min-w-0"
            />
          </div>
        </div>

        {/* القسم اللي فيه اللغة، تسجيل الدخول/الخروج، والسلة */}
        <div className="flex items-center gap-6 md:gap-10 justify-center md:justify-end flex-wrap sm:flex-nowrap">

          {/* اللغة */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-gray-700 "
          >
            <option value="العربيه">العربية</option>
            <option value="الانجليزيه">الإنجليزية</option>
          </select>

          {/* تسجيل الدخول أو الخروج */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 font-semibold whitespace-nowrap"
            >
              <FiUser className="text-xl mr-1" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
          ) : (
            <Link to="/register" className="flex items-center text-gray-700 whitespace-nowrap">
              <FiUser className="text-xl mr-1" />
              <span className="hidden sm:inline">انشاء حساب</span> 
            </Link>
          )}

          {/* السلة */}
          <Link to="/cart" className="text-gray-700 text-2xl">
            <FiShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
}
