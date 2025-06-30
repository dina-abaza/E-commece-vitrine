import React from "react";
import { FaTruck, FaArrowCircleLeft, FaBox } from 'react-icons/fa';

export default function ServiceIntoNav() {
  return (
    <div className="w-full flex justify-around items-center h-20 px-4">

      {/* عنصر 1 */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left text-xs sm:text-base">
        <FaTruck size={25} />
        <h2>توصيل او استلام من الفرع</h2>
      </div>

      {/* عنصر 2 */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left text-xs sm:text-base">
        <FaArrowCircleLeft size={25} />
        <h2>14 يوم ارجاع</h2>
      </div>

      {/* عنصر 3 */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left text-xs sm:text-base">
        <FaBox size={25} />
        <h2>الشحن مجانا</h2>
      </div>

    </div>
  );
}
