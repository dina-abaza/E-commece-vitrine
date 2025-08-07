import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useCartStore from "../../store/customerStore/cartStore";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get("https://e-commece-vitrine-api.vercel.app/api/products");
        const foundProduct = res.data.find(p => p._id === id);

        if (!foundProduct) {
          setError("المنتج غير موجود");
        } else {
          setProduct(foundProduct);
        }
      } catch (err) {
        setError(`حدث خطأ أثناء جلب بيانات المنتج: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!color) {
      toast.info("من فضلك اختر اللون أولاً");
      return;
    }
    addToCart({
      ...product,
      color,
      quantity,
    });
    toast.success("✅ تم إضافة المنتج إلى السلة");
    
  };

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return null;

  return (
    <div className="animate-slideInFromLeft p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <img
        src={product.image || "https://via.placeholder.com/400"}
        alt={product.name}
        className="w-full h-64 object-cover rounded"
      />
      <p className="my-4">{product.description}</p>
      <p className="font-semibold mb-4">السعر: {product.price} جنيه</p>
      <span className="text-sm text-white bg-red-500 p-1 rounded">{product.offer.discountPercent}%</span>
      <p className="font-bold mt-2 mb-4">{product.offer.discountedPrice} جنيه</p>

      <label htmlFor="colorSelect" className="block mb-2 font-semibold">
        اختر اللون:
      </label>
      <select
        id="colorSelect"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
      >
        <option value="">-- اختر اللون --</option>
        <option value="black">أسود</option>
        <option value="blue">أزرق</option>
        <option value="gray">رمادي</option>
      </select>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={decrease}
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
        >
          -
        </button>
        <span className="text-lg font-semibold">{quantity}</span>
        <button
          onClick={increase}
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="text-cyan-600 hover:underline font-semibold"
      >
        أضف إلى السلة
      </button>
    </div>
  );
}
