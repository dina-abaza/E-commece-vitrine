import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";

export default function AddProduct() {
  const token = AdminUseAuthStore((state) => state.token);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // حالة الخصم
  const [offer, setOffer] = useState({
    isActive: false,
    discountPercent: 0,
    discountedPrice: 0,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get(
          "https://e-commece-vitrine-api.vercel.app/api/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(res.data || []);
      } catch (error) {
        console.error("فشل جلب التصنيفات", error);
      }
    }
    if (token) fetchCategories();
  }, [token]);

  // دالة لحساب السعر بعد الخصم أو تحديث نسبة الخصم بناءً على السعر بعد الخصم
  function updateDiscountPercent(value) {
    let discount = Number(value);
    if (discount < 0) discount = 0;
    if (discount > 100) discount = 100;

    // نحسب السعر بعد الخصم
    const discounted = price
      ? (price - (price * discount) / 100).toFixed(2)
      : 0;

    setOffer({
      ...offer,
      discountPercent: discount,
      discountedPrice: discounted,
    });
  }

  function updateDiscountedPrice(value) {
    let discountedPrice = Number(value);
    if (discountedPrice < 0) discountedPrice = 0;

    // نحسب نسبة الخصم بناءً على السعر بعد الخصم
    const discountPercent = price
      ? ((1 - discountedPrice / price) * 100).toFixed(2)
      : 0;

    setOffer({
      ...offer,
      discountedPrice,
      discountPercent: discountPercent > 100 ? 100 : discountPercent < 0 ? 0 : discountPercent,
    });
  }

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

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("categoryId", categoryId);
      formData.append("image", imageFile);

      // إذا تم تفعيل الخصم فقط نضيفه
      if (offer.isActive) {
        formData.append("offer", JSON.stringify({
          isActive: true,
          discountPercent: Number(offer.discountPercent),
          discountedPrice: Number(offer.discountedPrice),
        }));
      } else {
        formData.append("offer", JSON.stringify({
          isActive: false,
        }));
      }

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
      setOffer({ isActive: false, discountPercent: 0, discountedPrice: 0 });
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
          onChange={(e) => {
            setPrice(e.target.value);
            // لما السعر يتغير نحسب الخصم او نحدث السعر بعد الخصم
            if (offer.isActive) {
              updateDiscountPercent(offer.discountPercent);
            }
          }}
          required
          min="0"
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

        {/* تفعيل خصم */}
        <label className="flex items-center gap-3 mt-3">
          <input
            type="checkbox"
            checked={offer.isActive}
            onChange={(e) => setOffer({ ...offer, isActive: e.target.checked })}
          />
          <span>تفعيل الخصم</span>
        </label>

        {/* إذا الخصم مفعل، تظهر الحقول */}
        {offer.isActive && (
          <>
            <input
              type="number"
              min="0"
              max="100"
              placeholder="نسبة الخصم (%)"
              value={offer.discountPercent}
              onChange={(e) => updateDiscountPercent(e.target.value)}
              className="bg-gray-100 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />

            <input
              type="number"
              min="0"
              placeholder="السعر بعد الخصم"
              value={offer.discountedPrice}
              onChange={(e) => updateDiscountedPrice(e.target.value)}
              className="bg-gray-100 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          </>
        )}

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
