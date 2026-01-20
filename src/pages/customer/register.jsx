import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/customerStore/authStore";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const register = await axios.post("https://e-commece-vitrine-api.vercel.app/api/register", form);

      if (register.data.message === "تم إنشاء الحساب بنجاح") {
        setToken(register.data.accessToken);
        setUser(register.data.user);
        navigate("/");
      }
    } catch (error) {
      alert("حدث خطأ أثناء إنشاء الحساب");
      console.error(error);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form 
        onSubmit={handleSubmit} 
        className="animate-slideInFromLeft flex flex-col gap-6 mx-auto w-full max-w-md p-8 bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
      >
        <div className="text-center space-y-2 mb-4">
          <h2 className="text-3xl font-black text-gray-900">إنشاء حساب</h2>
          <p className="text-gray-500 text-sm">أهلاً بك! يرجى إدخال بياناتك للبدء</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="الاسم الكامل"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-yellow-500 focus:bg-white transition-all"
          />

          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-yellow-500 focus:bg-white transition-all"
          />

          <input
            type="password"
            name="password"
            placeholder="كلمة السر"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-yellow-500 focus:bg-white transition-all"
          />
        </div>

        <button 
          type="submit" 
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-4 font-black rounded-2xl shadow-lg shadow-yellow-200 transition-all transform active:scale-95 mt-2"
        >
          إنشاء الحساب
        </button>

        <p className="text-center text-gray-600 font-medium">
          عندك حساب؟{" "}
          <Link to="/login" className="text-yellow-600 hover:text-yellow-700 font-bold underline underline-offset-4">
            سجل الدخول
          </Link>
        </p>
      </form>
    </div>
  );
}