
import React from "react";
import { Link } from "react-router-dom";
import { FaLightbulb, FaCouch, FaDoorOpen, FaUtensils, FaThLarge, FaTv, FaBed, FaHome } from "react-icons/fa";

const CategoriesGrid = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid grid-cols-4 gap-6">
        
        <Link
          to="/lighting"
          className="flex  items-center justify-center bg-gray-100 flex-1 p-6 rounded cursor-pointer hover:bg-gray-300 transition text-center no-underline text-black min-h-[150px]"
        >
          <FaLightbulb className="text-4xl mb-3 text-yellow-500" />
          الإضاءة
        </Link>

        <Link
          to="/outdoor"
          className="flex  items-center justify-center bg-gray-100 flex-1 p-6 rounded cursor-pointer hover:bg-gray-300 transition text-center no-underline text-black min-h-[150px]"
        >
          <FaDoorOpen className="text-4xl mb-3 text-green-500" />
          المنتجات الخارجية
        </Link>

        <Link
          to="/dining"
          className="flex  items-center justify-center bg-gray-100 flex-1 p-6 rounded cursor-pointer hover:bg-gray-300 transition text-center no-underline text-black min-h-[150px]"
        >
          <FaUtensils className="text-4xl mb-3 text-red-500" />
          غرفة الطعام
        </Link>

        <Link
          to="/sofa-l"
          className="flex  items-center justify-center bg-gray-100 flex-1 p-6 rounded cursor-pointer hover:bg-gray-300 transition text-center no-underline text-black min-h-[150px]"
        >
          <FaThLarge className="text-4xl mb-3 text-purple-500" />
          ركنة حرف L
        </Link>

        
        <Link
          to="/living-room"
          className="flex items-center justify-center bg-gray-100 flex-1 p-6 rounded cursor-pointer hover:bg-gray-300 transition text-center no-underline text-black min-h-[150px]"
        >
          <FaTv className="text-4xl mb-3 text-blue-500" />
          غرفة المعيشة
        </Link>

        <Link
          to="/bedroom"
          className="flex  items-center justify-center bg-gray-100 flex-1 p-6 rounded cursor-pointer hover:bg-gray-300 transition text-center no-underline text-black min-h-[150px]"
        >
          <FaBed className="text-4xl mb-3 text-pink-500" />
          غرف النوم
        </Link>

        <Link
          to="/single-pieces"
          className="flex  items-center justify-center bg-gray-100 flex-1 p-6 rounded cursor-pointer hover:bg-gray-300 transition text-center no-underline text-black min-h-[150px]"
        >
          <FaCouch className="text-4xl mb-3 text-indigo-500" />
          قطع أثاث منفصلة
        </Link>

        <Link
          to="/full-house"
          className="flex items-center justify-center bg-gray-100 flex-1 p-6 rounded cursor-pointer hover:bg-gray-300 transition text-center no-underline text-black min-h-[150px]"
        >
          <FaHome className="text-4xl mb-3 text-orange-500" />
          إفرش بيتك كامل
        </Link>
      </div>
    </div>
  );
};

export default CategoriesGrid;
