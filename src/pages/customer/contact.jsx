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
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
        
        {/* Header القسم */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-3">تواصل معنا</h2>
          <p className="text-gray-500 font-medium">نحن هنا لمساعدتك، أرسل لنا استفسارك وسنرد عليك في أقرب وقت</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* الحقول تظهر فقط إذا لم يكن هناك توكن (حسب اللوجيك الخاص بك) */}
          {!token && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="اسمك"
                value={formData.name}
                onChange={handleChange}
                required={!token}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-yellow-500 focus:bg-white transition-all transition-duration-300"
              />
              <input
                type="email"
                name="email"
                placeholder="بريدك الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                required={!token}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-yellow-500 focus:bg-white transition-all transition-duration-300"
              />
            </div>
          )}

          <textarea
            name="message"
            placeholder="اكتب رسالتك هنا..."
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-yellow-500 focus:bg-white transition-all transition-duration-300 h-40 resize-none"
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-4 rounded-2xl font-black text-lg shadow-lg shadow-yellow-200 hover:bg-yellow-500 transition-all transform active:scale-95 mt-2"
          >
            إرسال الرسالة
          </button>

          {/* رسالة الحالة */}
          {status && (
            <div className={`mt-4 p-4 rounded-xl text-center font-bold ${
              status.includes("بنجاح") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}>
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}