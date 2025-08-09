
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UseVerifyAdmin from "../../hooks/useverifyadmin";

const AdminLogin = () => {
  UseVerifyAdmin()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
     const res= await axios.post("https://e-commece-vitrine-api.vercel.app/api/login", { email, password }, {
        withCredentials: true 
      });
      console.log(res.data)
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء الاتصال بالسيرفر");

    }
  };

  return (
    <div className="animate-slideInFromLeft w-full max-w-3xl mx-auto mt-30 p-6 rounded shadow-md bg-white">

      <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto">
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-4 rounded border border-white shadow-xl outline-none "
        />
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-4 rounded border border-white shadow-xl outline-none"
        />
        {error && <p className="text-red-600 text-center">{error}</p>}
        <button
          type="submit"
          className="text-2xl font-bold mx-auto px-6 py-2 rounded bg-white text-blue-900 border border-blue-900 hover:text-blue-700 transition-colors duration-300"
        >
          تسجيل دخول
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
