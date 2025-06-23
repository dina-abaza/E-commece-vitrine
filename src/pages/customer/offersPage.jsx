
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function OffersPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  const categorySlug = searchParams.get("categorySlug");
  const maxPrice = searchParams.get("maxPrice");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `https://e-commece-vitrine-api.vercel.app/api/offers?${categorySlug}&maxPrice=${maxPrice}`
        );
        setProducts(res.data.products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (categorySlug && maxPrice) {
      fetchProducts();
    }
  }, [categorySlug, maxPrice]);

  return (
    <div className="animate-slideInFromLeft p-6">
      <h1 className="text-2xl font-bold mb-6">المنتجات</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="shadow rounded bg-white p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-60 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="mt-2">
              <span className="text-gray-500 line-through">{product.price}</span>{" "}
              <span className="text-green-600 font-bold">{product.offer.discountedPrice}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OffersPage;
