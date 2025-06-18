import React, { useState, useEffect } from "react";
import axios from "axios";
import useCartStore from "../../store/cartStore";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    const storedData = localStorage.getItem("products");
    if (storedData) {
      setProducts(JSON.parse(storedData));
      setLoading(false);
    }

    async function fetchData() {
      try {
        const res = await axios.get("https://e-commece-vitrine-api.vercel.app/api/products"); 
        setProducts(res.data);
        console.log('Products:', products);
        localStorage.setItem("products", JSON.stringify(res.data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 m-10">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      {loading && <p className="text-gray-600">جاري التحميل...</p>}
      {error && <p className="text-red-600 font-bold">{error}</p>}
      {!loading && products.length === 0 && (
        <p className="text-gray-500">لا توجد منتجات</p>
      )}

      <div className=" w-full mx-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="w-full relative bg-white shadow-md rounded-lg"
          >
            
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
              {product.offer}
            </span>

    
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {product.name}
              </h3>
              <p className="text-gray-700 font-bold">
                {product.price}
              </p>
              <button onClick={()=>addToCart(product)}>add to cart</button>
            </div>

            <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
              to={`/product/${product.id}`}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 inline-block text-center">
                عرض التفاصيل
                 </Link>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
}
