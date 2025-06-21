import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

function handleChange(e) {
  setForm((prev) => {
    const updated = { ...prev, [e.target.name]: e.target.value };
    console.log("Updated form:", updated); 
    return updated;
  });
}

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const loginRes = await axios.post("https://e-commece-vitrine-api.vercel.app/api/login", form);

      const token = loginRes.data.token;
      setToken(token);

      const userRes = await axios.get("https://e-commece-vitrine-api.vercel.app/api/verify-login", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(userRes.data);

      navigate("/home");
    } catch (error) {
      alert("فشل تسجيل الدخول");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3 mx-auto m-10">
      <h2 className="text-2xl font-bold text-center">تسجيل الدخول</h2>

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
        تسجيل الدخول
      </button>

  
    </form>
  );
}
