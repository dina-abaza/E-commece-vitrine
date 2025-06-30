
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/customerStore/authStore";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // جلب دوال التحديث من Zustand
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
    <form
      onSubmit={handleSubmit}
      className="animate-slideInFromLeft flex flex-col gap-4 mx-auto m-10
                 w-full max-w-md p-2 sm:w-1/2"
    >
      <h2 className="text-2xl font-bold text-center">تسجيل الدخول</h2>

      <input
        type="email"
        name="email"
        placeholder="الإيميل"
        value={form.email}
        onChange={handleChange}
        required
        className="p-2 border rounded w-full"
      />

      <input
        type="password"
        name="password"
        placeholder="كلمة السر"
        value={form.password}
        onChange={handleChange}
        required
        className="p-2 border rounded w-full"
      />

      <button
        type="submit"
        className="bg-yellow-600 text-black p-2 font-bold rounded w-full"
      >
        تسجيل الدخول
      </button>

      <p className="text-center text-sm">
        ليس لديك حساب؟{" "}
        <Link to="/register" className="text-blue-600 underline">
          إنشاء حساب
        </Link>
      </p>
    </form>
  );
}
