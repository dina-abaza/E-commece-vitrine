import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/customerStore/authStore";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://e-commece-vitrine-api.vercel.app/api/login", form);

      if (response.data.accessToken) {
        setToken(response.data.accessToken);
        setUser(response.data.user);
        navigate("/");
      } else {
        alert("بيانات الدخول غير صحيحة");
      }
    } catch (error) {
      alert("حدث خطأ أثناء تسجيل الدخول");
      console.error(error);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="animate-slideInFromLeft flex flex-col gap-6 mx-auto w-full max-w-md p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
      >
        <div className="text-center space-y-2 mb-2">
          <h2 className="text-3xl font-black text-gray-900">تسجيل الدخول</h2>
          <p className="text-gray-500 text-sm">مرحباً بعودتك! سجل دخولك للمتابعة</p>
        </div>

        <div className="space-y-4">
          <div className="group">
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-yellow-500 focus:bg-white transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="group">
            <input
              type="password"
              name="password"
              placeholder="كلمة السر"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-yellow-500 focus:bg-white transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-black py-4 font-black rounded-2xl shadow-lg shadow-yellow-100 transition-all transform active:scale-95 mt-2 w-full"
        >
          تسجيل الدخول
        </button>

        <p className="text-center text-gray-600 font-medium text-sm">
          ليس لديك حساب؟{" "}
          <Link 
            to="/register" 
            className="text-yellow-600 hover:text-yellow-700 font-bold underline underline-offset-4"
          >
            إنشاء حساب جديد
          </Link>
        </p>
      </form>
    </div>
  );
}