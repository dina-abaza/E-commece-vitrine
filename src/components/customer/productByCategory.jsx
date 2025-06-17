import React, { useEffect, useState } from "react";
import axios from "axios";
import useCartStore from "../../store/cartStore";

export default function ProductByCategory({ category, title }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    const storedData = localStorage.getItem(`products-${category}`);
    if (storedData) {
      setProducts(JSON.parse(storedData));
    }

    async function fetchData() {
      try {
        const url = `https://api.example.com/products?category=${category}`;
        const res = await axios.get(url);
        localStorage.setItem(`products-${category}`, JSON.stringify(res.data));
        setProducts(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [category]);

  return (
    <div className="p-6 m-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      {loading && <p>جاري التحميل...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && products.length === 0 && (
        <p className="text-gray-500">لا توجد منتجات</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white shadow rounded p-4">

              <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">
                {product.offer}
              </span>
        
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              أضف إلى السلة
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
