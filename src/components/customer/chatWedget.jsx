import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const sendMessage = async () => {
    if (!token) {
      setError("يرجى تسجيل الدخول أولًا");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      await axios.post(
        "https://your-backend.com/api/support-message",
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("");
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError("حدث خطأ أثناء الإرسال",err);
    }
  };

  function GoToLogin() {
    navigate("/login");
    setOpen(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="text-blue-700 p-4 animate-pulse transition-transform duration-300 hover:scale-125 cursor-pointer"
        >
          <FaEnvelope className="text-4xl" />
        </button>
      )}

      {open && (
        <div className="bg-white p-4 rounded-lg shadow-lg w-72 relative">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-gray-700 font-bold">كيف يمكنني مساعدك؟</h4>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-red-600 text-2xl font-bold cursor-pointer"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="w-full p-2 border rounded mb-2"
            rows={3}
          />

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          <div className="flex justify-between items-center">
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              إرسال
            </button>
          </div>

          {sent && (
            <p className="text-green-600 mt-2 text-sm">
              ✅ تم إرسال رسالتك بنجاح
            </p>
          )}

          {!token && (
            <p
              className="text-blue-500 mt-2 text-sm underline cursor-pointer"
              onClick={GoToLogin}
            >
              تسجيل الدخول الآن
            </p>
          )}
        </div>
      )}
    </div>
  );
}

