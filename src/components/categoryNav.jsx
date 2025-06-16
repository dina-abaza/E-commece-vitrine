import React from "react";
import { Link } from "react-router-dom";

export default function CategoryNav(){
  return(
    <div className="w-3/4 m-auto bg-gray-200 flex justify-center items-center gap-5 h-12 rounded-xl">
      <Link
        to="/allProducts"
        className=" text-gray-700 hover:text-black hover: font-bold transition-colors duration-200"
      >
        الكاتالوج
      </Link>
      <Link
        to="/furniture"
        className=" text-gray-700 hover:text-black hover:font-bold transition-colors duration-200"
      >
        الاثاث
      </Link>
      <Link
        to="/ligting"
        className=" text-gray-700 hover:text-black hover:font-bold transition-colors duration-200"
      >
        الاضاءه
      </Link>
      <Link
        to="/decor"
        className=" text-gray-700 hover:text-black hover:font-bold transition-colors duration-200"
      >
        الديكور
      </Link>
    </div>
  )
}