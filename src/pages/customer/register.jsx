
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
        navigate("/login");
      }
    } catch (error) {
      alert("حدث خطأ أثناء إنشاء الحساب");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="animate-slideInFromLeft flex flex-col gap-4 mx-auto m-10
                 w-full max-w-md p-2 sm:w-1/2">
      <h2 className="text-2xl font-bold text-center">إنشاء حساب</h2>

      <input
        type="text"
        name="name"
        placeholder="الاسم"
        value={form.name}
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="الإيميل"
        value={form.email}
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="كلمة السر"
        value={form.password}
        onChange={handleChange}
        required
        className="p-2 border rounded"
      />

      <button type="submit" className="bg-yellow-600 text-black p-2 font-bold rounded">
        إنشاء الحساب
      </button>

      <p className="text-center text-sm">
        عندك حساب؟{" "}
        <Link to="/login" className="text-blue-600 underline">
          سجل الدخول
        </Link>
      </p>
    </form>
  );
}
