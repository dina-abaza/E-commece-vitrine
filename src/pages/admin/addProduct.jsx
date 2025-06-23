import React, { useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";

export default function AddProduct() {
  const token = AdminUseAuthStore((state) => state.token);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!token) {
      alert("يجب تسجيل الدخول أولاً");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
     await axios.post(
        "",
        product,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("تم إضافة المنتج بنجاح!");
      setProduct({ name: "", price: "", image: "", description: "" }); // مسح الفورم
    } catch (error) {
      setMessage("حدث خطأ أثناء إضافة المنتج");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="name"
          placeholder="اسم المنتج"
          value={product.name}
          onChange={handleChange}
          required
          className="bg-gray-100 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
        <input
          type="number"
          name="price"
          placeholder="السعر"
          value={product.price}
          onChange={handleChange}
          required
          className="bg-gray-100 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
        <input
          type="text"
          name="image"
          placeholder="رابط صورة المنتج"
          value={product.image}
          onChange={handleChange}
          required
          className="bg-gray-100 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
        <textarea
          name="description"
          placeholder="وصف المنتج"
          value={product.description}
          onChange={handleChange}
          rows={4}
          className="bg-gray-100 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition resize-none"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className={`py-3 rounded-md text-white font-semibold transition ${
            loading
              ? "bg-cyan-300 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-700"
          }`}
        >
          {loading ? "جارٍ الإضافة..." : "أضف المنتج"}
        </button>
      </form>
      {message && (
        <p className="mt-5 text-center text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
}
