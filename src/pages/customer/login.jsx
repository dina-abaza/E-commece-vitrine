import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post('', form);
      
      if (res.data.success) {
        alert("تم تسجيل الدخول بنجاح ✅");
      } else {
        alert("فشل في تسجيل الدخول ❌");
      }
    } catch (error) {
      console.error(error);
      alert("حدث خطأ أثناء تسجيل الدخول");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3 mx-auto m-10">
        <h2 className="text-black text-center font-bold text-2xl">sign up</h2>
      <input
        type="text"
        name="name"
        placeholder="ادخل الاسم"
        value={form.name}
        onChange={handleChange}
        className="p-2  rounded focus:outline-none focus:ring-2 focus:ring-yellow-600
"
      />
      <input
        type="email"
        name="email"
        placeholder="ادخل الايميل"
        value={form.email}
        onChange={handleChange}
        className="p-2  rounded focus:outline-none focus:ring-2 focus:ring-yellow-600
"
      />
      <input
        type="password"
        name="password"
        placeholder="ادخل الرقم السري"
        value={form.password}
        onChange={handleChange}
        className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-600
"
      />
      <button type="submit" className="bg-yellow-600 text-black p-2 font-bold rounded w-60 block mx-auto">
        تسجيل الدخول
      </button>
    </form>
  );
}
