
import React, { useState } from "react";
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from "react-router-dom"; 
import { MdDashboard } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import useAuthStore from "../../store/customerStore/authStore";
import SearchAutocomplete from "./searchAutoComplet";
import useCartStore from "../../store/customerStore/cartStore";

export default function SearchNav() {
  const [lang, setLang] = useState('العربيه');
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
   const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems?.length
  ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
  : 0;

  const navigate = useNavigate();

  function handleLogout() {
    logout();      
    navigate("/login");  
  }

  return (
    <div className="w-full bg-white p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
        
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 flex-grow">
        
          <h1 className="flex items-center gap-2 text-yellow-500 flex-shrink-0">
            <Link to="/admin/login" title="Admin Login">
              <MdDashboard 
                className="cursor-pointer hover:text-yellow-700 hover:scale-125 transition-transform duration-300 animate-pulse" 
                size={24} 
              />
            </Link>
            <Link to="/" className="text-xl sm:text-2xl font-bold">vitrine</Link>
          </h1>

    
          <div className="flex-grow min-w-0 max-w-full">
            <SearchAutocomplete />
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-10 justify-center md:justify-end flex-wrap sm:flex-nowrap">
          
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-gray-700"
          >
            <option value="العربيه">العربية</option>
            <option value="الانجليزيه">الإنجليزية</option>
          </select>

      {user ? (
      <div className="flex justify-center items-center gap-4">
            
          <button
          onClick={handleLogout}
          className="flex items-center text-red-600 font-semibold text-sm sm:text-base">
            <FiUser className="text-xl mr-1" />
            <span className="hidden sm:inline">تسجيل الخروج</span>
          </button>
          
          
        <Link to="/myOrders">
          <button className="flex items-center text-yellow-600 font-semibold text-sm sm:text-base">
            <FiPackage className="text-xl mr-1" />
            <span>طلباتي</span>
          </button>
        </Link>
        
      </div>
           

          ) : (
            <Link to="/register" className="flex items-center text-gray-700 whitespace-nowrap">
              <FiUser className="text-xl mr-1" />
              <span className="hidden sm:inline">انشاء حساب</span> 
            </Link>
          )}

          <Link to="/cart" className="text-gray-700 text-2xl relative">
            <FiShoppingCart />
              {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {totalItems}
                      </span>
                   )}
          </Link>
        </div>
      </div>
    </div>
  );
}
