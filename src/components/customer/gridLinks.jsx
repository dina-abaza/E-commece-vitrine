
import React , {useState , useEffect} from "react";
import { Link } from "react-router-dom";
import { FaLightbulb, FaCouch, FaDoorOpen, FaUtensils, FaThLarge, FaTv, FaBed, FaHome } from "react-icons/fa";
import axios from "axios";
// This component fetches categories from the backend and displays them in a grid format with icons.

const CategoriesGrid = () => {


  const [categories, setCategories] = useState([]); // State to hold categories fetched from the backend

  // Fetch categories from the backend when the component mounts
  // Using useEffect to perform side effects in functional components

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/categories`)
      .then(response => {
        setCategories(response.data);
        console.log("Fetched categories:", response.data);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);


  const iconMap = {
    lighting: <FaLightbulb className="text-4xl mb-3 text-yellow-500" />,
    outdoor: <FaDoorOpen className="text-4xl mb-3 text-green-500" />,
    dining: <FaUtensils className="text-4xl mb-3 text-red-500" />,
    "sofa-l": <FaThLarge className="text-4xl mb-3 text-purple-500" />,
    "living-room": <FaTv className="text-4xl mb-3 text-blue-500" />,
    bedroom: <FaBed className="text-4xl mb-3 text-pink-500" />,
    "single-pieces": <FaCouch className="text-4xl mb-3 text-indigo-500" />,
    "full-house": <FaHome className="text-4xl mb-3 text-orange-500" />
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            to={`/category/${cat.slug}/${cat._id}`}
            className="flex items-center justify-center bg-gray-100 flex-1 p-6 rounded cursor-pointer hover:bg-gray-300 transition text-center no-underline text-black min-h-[150px]"
          >
            {iconMap[cat.slug] || <FaThLarge className="text-4xl mb-3" />}
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;
