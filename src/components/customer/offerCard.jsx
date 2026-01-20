import React from "react";
import { Link } from "react-router-dom";

export default function OfferCard({ image, title, link }) {
  return (
    <div className="relative w-full max-w-6xl m-auto h-[600px] shadow-lg overflow-hidden rounded-2xl">
      {/* الصورة خلفية ثابتة بدون حركة */}
      <img src={image} alt={title} className="w-full h-full object-cover" />
      
      {/* المحتوى النصي */}
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 text-right">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-8 drop-shadow-md">
          {title}
        </h2>
        
        <Link
          to={link}
          className="
            inline-block
            bg-yellow-400 
            text-blue-900 
            text-lg
            font-black       /* خط تسوق الآن عريض جداً */
            px-6 py-2      /* زيادة المسافات حول النص */
            rounded-full     /* زر دائري بالكامل (دوران) */
            shadow-xl 
            transition-transform 
            hover:scale-110  /* تكبير بسيط جداً عند الهوفر للتفاعل */
            active:scale-95
          "
        >
          تسوق الآن
        </Link>
      </div>
    </div>
  );
}