import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";

export default function AddProduct() {
  const token = AdminUseAuthStore((state) => state.token);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("https://e-commece-vitrine-api.vercel.app/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(res.data || []);
      } catch (error) {
        console.error("فشل جلب التصنيفات", error);
      }
    }

    fetchCategories();
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!token) {
      alert("يجب تسجيل الدخول أولاً");
      return;
    }
    if (!imageFile) {
      alert("يرجى رفع صورة المنتج");
      return;
    }
    if (!categoryId) {
      alert("يرجى اختيار التصنيف");
      return;
    }

    setLoading(true);
    setMessage("");
    
  console.log("name:", name);
  console.log("price:", price);
  console.log("categoryId:", categoryId);
  console.log("imageFile:", imageFile);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("categoryId", categoryId);
      formData.append("image", imageFile);



      await axios.post(
        "https://e-commece-vitrine-api.vercel.app/api/addproduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("تم إضافة المنتج بنجاح!");
      setName("");
      setPrice("");
      setCategoryId("");
      setImageFile(null);
    } catch (error) {
      setMessage("حدث خطأ أثناء إضافة المنتج");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-slideInFromLeft w-full max-w-3xl mx-auto bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          name="name"
          placeholder="اسم المنتج"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-gray-100 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        <input
          type="number"
          name="price"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="bg-gray-100 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

      
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="bg-gray-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        >
          <option value="">اختر التصنيف</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
          className="bg-gray-100 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className={`py-3 rounded-md text-white font-semibold transition ${
            loading ? "bg-cyan-300 cursor-not-allowed" : "bg-cyan-600 hover:bg-cyan-700"
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
