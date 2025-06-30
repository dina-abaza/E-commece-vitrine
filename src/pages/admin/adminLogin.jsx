import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/products");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("adminToken", token);
      navigate("/admin/products");
    } catch (err) {
      setError("تأكد من الايميل والباسوور",err);
    }
  };

  return (
    <div className="animate-slideInFromLeft w-full max-w-3xl mx-auto mt-20 p-6 rounded shadow-md bg-white">
      <h2 className="text-xl font-bold mb-6 text-center text-blue-900">يرجي تسجيل الدخول </h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm">
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 rounded focus:outline-none focus:border-blue-700 border-transparent border  placeholder:font-bold"
        
        />
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 rounded focus:outline-none focus:border-blue-700 border-transparent border  placeholder:font-bold"
          
        />
        {error && <p className="text-red-600 text-center">{error}</p>}
        <button
          type="submit"
          className=" text-2xl font-bold mx-auto px-6 py-2 rounded bg-white text-blue-900 border border-blue-900  hover:text-blue-700 transition-colors duration-300"
        
        >
          login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
