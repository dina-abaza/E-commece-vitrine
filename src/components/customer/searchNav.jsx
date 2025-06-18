import React, { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { Link } from "react-router-dom"; 
import { MdDashboard } from "react-icons/md";

export default function SearchNav() {
  const [lang, setLang] = useState('العربيه');

  return (
    <div className="w-ful  flex items-center justify-around py-3 px-4 bg-white  h-30">
      
    <h1 className="text-xl text-yellow-500 flex items-center gap-2">
      <Link to="/admin/login" title="Admin Login">
      <MdDashboard size={30} className="cursor-pointer hover:text-yellow-700" />
      </Link>
      <Link to="/">vitrine</Link>
      
    </h1>

    
      <div className="w-1/2 flex items-center border border-gray-300 rounded-md py-2 px-3 ">
        <FiSearch className="text-gray-500 text-xl mr-2" />
        <input
          type="text" 
          placeholder="ابحث..." 
          className="flex-grow outline-none text-gray-700" 
        />
      </div>

    
      <div className="flex items-center gap-6 md:gap-10">
        
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-gray-700 "
        >
          <option value="العربيه">العربية</option>
          <option value="الانجليزيه">الإنجليزية</option>
        </select>

        
        <Link to="/login" className="flex items-center text-gray-700 ">
          <FiUser className="text-xl mr-1" />
          <span className="hidden md:inline">تسجيل الدخول</span> 
        </Link>

    
        <Link to="/cart" className=" text-gray-700 ">
          <FiShoppingCart className="text-2xl" />
        
        </Link>
      </div>
    </div>
  );
}