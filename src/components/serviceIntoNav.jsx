import React from "react";
import { FaTruck, FaArrowCircleLeft, FaBox } from 'react-icons/fa';

export default function ServiceIntoNav(){
    return(
        <div className="w-full flex justify-around h-16 "> 
            <div className="flex justify-center items-center gap-2">
                <h2>توصيل او استلام من الفرع</h2>
                <FaTruck size={25}/>
            </div>

            <div className="flex justify-center items-center gap-2">
                <h2>14 يوم ارجاع</h2>
                <FaArrowCircleLeft size={25}/>
            </div>

            <div className="flex justify-center items-center gap-2">
                <h2>الشحن مجانا</h2>
                <FaBox size={25}/>
            </div>
        </div>
    )
}