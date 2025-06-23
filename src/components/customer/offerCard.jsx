import React from "react";
import { Link } from "react-router-dom";

export default function OfferCard({ image, title, link }) {
  return (
    <div className="relative w-full max-w-6xl m-auto h-[600px] shadow-lg ">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute top-1/2 right-10 transform -translate-y-1/2 text-right">
        <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
           <Link
          to={link}
          className="bg-yellow-400 text-blue-900 px-6 py-2 rounded shadow"
        >
          تسوق الآن
        </Link>
      </div>
    </div>
  );
}
