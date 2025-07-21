import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEnvelope } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";

export default function AdminMessagesWidget() {
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  const user = AdminUseAuthStore((state) => state.user); // تأكد أن user يحتوي على token

  useEffect(() => {
    async function fetchMessages() {
      try {
        const headers = {};
        if (user?.token) {
          headers.Authorization = `Bearer ${user.token}`;
        }
        const res = await axios.get(
          "https://e-commece-vitrine-api.vercel.app/api/Get_messages",
          { headers }
        );

        // الرسائل من API
        let msgs = res.data.messages || [];

        // رتب الرسائل من الأحدث للأقدم
        msgs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setMessages(msgs);
        if (msgs.length > 0) setHasNew(true);
      } catch (err) {
        console.error("خطأ أثناء جلب الرسائل", err);
      }
    }

    fetchMessages();
  }, [user]);

  const handleOpen = () => {
    if (!user) {
      toast.info("سجل دخول أولًا لتتلقى رسائل الإدارة", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setOpen(true);
    setHasNew(false);
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        {!open && (
          <button
            onClick={handleOpen}
            className={`text-blue-700 p-4 ${
              hasNew ? "animate-pulse" : ""
            } hover:scale-110 transition-transform`}
            aria-label="فتح رسائل الإدارة"
          >
            <FaEnvelope className="text-4xl" />
          </button>
        )}

        {open && user && (
          <div className="bg-white w-80 max-h-96 overflow-y-auto p-4 rounded-lg shadow-xl relative text-right">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-bold text-blue-700">📨 رسائل من الإدارة</h4>
              <button
                onClick={() => setOpen(false)}
                className="text-2xl font-bold text-gray-500 hover:text-red-600"
                aria-label="إغلاق الرسائل"
              >
                ×
              </button>
            </div>

            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">لا توجد رسائل حالياً</p>
            ) : (
              messages.map((msg) => (
                // اعرض الرسائل التي إما عامة أو موجهة لهذا المستخدم فقط
                (msg.forAll || msg.forUser === user.id) && (
                  <div
                    key={msg._id}
                    className="bg-blue-50 border border-blue-200 rounded p-3 mb-3"
                  >
                    <h5 className="text-blue-800 font-semibold">{msg.title}</h5>
                    <p className="text-gray-700 text-sm mb-1">{msg.content}</p>
                    <p className="text-gray-400 text-xs">
                      {new Date(msg.createdAt).toLocaleString("ar-EG", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                )
              ))
            )}
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  );
}
