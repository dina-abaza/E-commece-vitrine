
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SimpleSearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    async function DataSuggetion() {
      try {
        const response = await axios.get(
          "https://e-commece-vitrine-api.vercel.app/api/search/suggestions",
          { params: { query } }
        );
        setSuggestions(response.data || []);
      } catch (error) {
        console.log("خطأ في الاقتراحات:", error);
      
      }
     
    };

   DataSuggetion();
  }, [query]);

  async function searchProducts(searchTerm) {
    if (!searchTerm.trim()) return;

    try {
      const response = await axios.get(
        "https://e-commece-vitrine-api.vercel.app/api/search/products",
        { params: { query: searchTerm } }
      );
      setProducts(response.data || []);
      setSuggestions([]); 
      setQuery("")
    } catch (error) {
      console.log("خطأ في جلب المنتجات:", error);
      setProducts([]);
    }
  }


  function handleSelectSuggestion(item) {
    searchProducts(item.name);
  }

  
  function handleSelectProduct(product) {
   navigate(`/product/${product._id}`);
    setProducts([]);
    setSuggestions([]);
    setQuery("");
  }

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center border border-gray-300 rounded-2xl py-2 px-3 w-full bg-white">
        <FiSearch className="text-gray-500 text-xl mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث..."
          className="flex-grow outline-none text-gray-700 min-w-0 bg-transparent"
        />
      </div>

  
      {suggestions.length > 0 && (
        <ul className="absolute z-20 left-0 right-0 mt-1 bg-white border shadow-md max-h-60 overflow-y-auto rounded">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(item)}
              className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-8 h-8 object-cover rounded"
              />
              <span className="text-sm">{item.name}</span>
            </li>
          ))}
        </ul>
      )}

      {/* عرض المنتجات */}
      {products.length > 0 && (
        <ul className="absolute z-20 left-0 right-0 mt-1 bg-white border shadow-md max-h-80 overflow-y-auto rounded">
          {products.map((product) => (
            <li
              key={product._id}
              onClick={() => handleSelectProduct(product)}
              className="p-3 flex justify-between cursor-pointer hover:bg-gray-100"
            >
              <span className="text-sm font-semibold">{product.name}</span>
              <span className="text-sm text-green-700 font-semibold">
                {product.price} جنيه
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
