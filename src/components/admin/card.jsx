import React from "react";

export default function Card({ title, value, color }) {
    const colorsMap = {
  blue: "bg-blue-100 text-blue-700",
  purple: "bg-purple-100 text-purple-700",
  green: "bg-green-100 text-green-700",
  red: "bg-red-100 text-red-700",
};
    const classes = colorsMap[color] || "bg-gray-100 text-gray-700";
  return (

    <div className={`${classes} p-6 rounded shadow-md`}>
      <h3 className="text-lg text-gray-600 mb-2">{title}</h3>
      <p className={`text-2xl  text-${color}-700`}>{value}</p>
    </div>
  );
}