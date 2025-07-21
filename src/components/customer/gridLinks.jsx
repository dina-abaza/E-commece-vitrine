
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaLightbulb, FaCouch, FaDoorOpen, FaUtensils, FaThLarge, FaTv, FaBed, FaHome } from "react-icons/fa";

const iconMap = {
  lighting: <FaLightbulb className="text-4xl mb-3 text-yellow-500" />,
  outdoor: <FaDoorOpen className="text-4xl mb-3 text-green-500" />,
  dining: <FaUtensils className="text-4xl mb-3 text-red-500" />,
  "sofa-l": <FaThLarge className="text-4xl mb-3 text-purple-500" />,
  "living-room": <FaTv className="text-4xl mb-3 text-blue-500" />,
  bedroom: <FaBed className="text-4xl mb-3 text-pink-500" />,
  "single-pieces": <FaCouch className="text-4xl mb-3 text-indigo-500" />,
  "full-house": <FaHome className="text-4xl mb-3 text-orange-500" />,
};

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://e-commece-vitrine-api.vercel.app/api/categories") 
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading categories...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
 <div className="max-w-7xl mx-auto py-10 px-4">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
    {categories.map(cat => (
    <Link
    key={cat._id}
     to={`/${cat.slug}/${cat._id}`}
     className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded cursor-pointer hover:bg-gray-300 transition-transform duration-300 ease-in-out transform hover:scale-105 text-center no-underline text-black min-h-[150px]"
     >
      {iconMap[cat.slug] || <FaHome className="text-4xl mb-3 text-gray-400" />}
      {cat.name}
      </Link>

    ))}
  </div>
</div>

  );
};

export default CategoriesGrid;
