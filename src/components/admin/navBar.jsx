
import React from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../store/customerStore/cartStore";

const Navbar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems?.length
  ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
  : 0;


  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-around px-4 md:px-8 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <h3 className="text-base md:text-xl font-semibold text-cyan-700">📊 Dashboard</h3>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <span className="text-sm text-gray-700 hidden sm:inline">👋 Welcome</span>

        <Link to="/" className="relative text-xl md:text-2xl hover:text-cyan-700 cursor-pointer hover:scale-125 transition-transform duration-300">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
