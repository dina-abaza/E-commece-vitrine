
import React, { useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/customerStore/authStore";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const token = useAuthStore((state) => state.token);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("جاري الإرسال...");

    let headers = {};
    if (token) {
      headers = { Authorization: `Bearer ${token}` };
    }

    const dataToSend = token ? { message: formData.message } : formData;
    
    console.log("Headers:", headers);
    console.log("Data to send:", dataToSend);

    try {
      const res = await axios.post(
        "https://e-commece-vitrine-api.vercel.app/api/postCuntactUs",
        dataToSend,
        { headers }
      );

      if (res.status === 200) {
        setStatus("تم إرسال الرسالة بنجاح!");
        setFormData({ name: "", email: "", message: "" });
      }

    } catch (error) {
      setStatus("حدث خطأ أثناء الإرسال، حاول مرة أخرى.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto flex flex-col gap-4 p-4 m-10"
    >
      <input
        type="text"
        name="name"
        placeholder="اسمك"
        value={formData.name}
        onChange={handleChange}
        required={!token}
        className="border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="بريدك الإلكتروني"
        value={formData.email}
        onChange={handleChange}
        required={!token}
        className="border p-2 rounded"
      />
      <textarea
        name="message"
        placeholder="رسالتك"
        value={formData.message}
        onChange={handleChange}
        required
        className="border p-2 rounded h-32"
      />
      <button
        type="submit"
        className="bg-yellow-400 text-blue-900 py-2 rounded font-bold hover:bg-yellow-500 hover:text-blue-700"
      >
        إرسال
      </button>
      {status && <p className="mt-2 text-center">{status}</p>}
    </form>
  );
}
