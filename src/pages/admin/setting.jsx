
import React, { useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";

export default function AdminSettings() {
  const token = AdminUseAuthStore((state) => state.token);

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [newAdminLoading, setNewAdminLoading] = useState(false);
  const [newAdminMessage, setNewAdminMessage] = useState("");

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewAdminChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminMessage("");
    try {
      await axios.put("", adminData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminMessage("تم تحديث بيانات الأدمن بنجاح.");
    } catch (err) {
      console.error(err);
      setAdminMessage("حدث خطأ أثناء تحديث البيانات.");
    } finally {
      setAdminLoading(false);
    }
  };

  const handleNewAdminSubmit = async (e) => {
    e.preventDefault();
    setNewAdminLoading(true);
    setNewAdminMessage("");
    try {
      await axios.post("", newAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewAdminMessage("تم إضافة الأدمن الجديد بنجاح.");
      setNewAdmin({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      setNewAdminMessage("حدث خطأ أثناء إضافة الأدمن.");
    } finally {
      setNewAdminLoading(false);
    }
  };

  return (
    <div className="animate-slideInFromLeft w-full max-w-3xl mx-auto bg-white rounded shadow p-6 mt-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* تعديل بيانات الأدمن */}
        <form onSubmit={handleAdminSubmit}>
          <h3 className="text-xl font-semibold mb-4 text-blue-900">تعديل بياناتك</h3>
          <label className="block mb-2 text-blue-900">
            الاسم:
            <input
              type="text"
              name="name"
              value={adminData.name}
              onChange={handleAdminChange}
              className="border p-2 w-full rounded"
              required
            />
          </label>
          <label className="block mb-2 text-blue-900">
            البريد الإلكتروني:
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleAdminChange}
              className="border p-2 w-full rounded"
              required
            />
          </label>
          <label className="block mb-4 text-blue-900">
            كلمة المرور:
            <input
              type="password"
              name="password"
              value={adminData.password}
              onChange={handleAdminChange}
              className="border p-2 w-full rounded"
              placeholder="اتركها فارغة إذا لم ترغب بالتغيير"
            />
          </label>
          <button
            type="submit"
            disabled={adminLoading}
            className="bg-blue-100 text-blue-800 px-5 py-2 rounded-lg border border-blue-300 hover:bg-blue-200 transition duration-300 shadow-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {adminLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
          {adminMessage && <p className="mt-2">{adminMessage}</p>}
        </form>

        {/* إضافة أدمن جديد */}
        <form onSubmit={handleNewAdminSubmit}>
          <h3 className="text-xl font-semibold mb-4 text-blue-900">إضافة أدمن جديد</h3>
          <label className="block mb-2 text-blue-900">
            الاسم:
            <input
              type="text"
              name="name"
              value={newAdmin.name}
              onChange={handleNewAdminChange}
              className="border p-2 w-full rounded"
              required
            />
          </label>
          <label className="block mb-2 text-blue-900">
            البريد الإلكتروني:
            <input
              type="email"
              name="email"
              value={newAdmin.email}
              onChange={handleNewAdminChange}
              className="border p-2 w-full rounded"
              required
            />
          </label>
          <label className="block mb-4 text-blue-900">
            كلمة المرور:
            <input
              type="password"
              name="password"
              value={newAdmin.password}
              onChange={handleNewAdminChange}
              className="border p-2 w-full rounded"
              required
            />
          </label>
          <button
            type="submit"
            disabled={newAdminLoading}
            className="bg-green-100 text-green-800 px-5 py-2 rounded-lg border border-green-300 hover:bg-green-200 transition duration-300 shadow-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {newAdminLoading ? "جاري الإضافة..." : "إضافة أدمن جديد"}
          </button>
          {newAdminMessage && <p className="mt-2">{newAdminMessage}</p>}
        </form>
      </div>
    </div>
  );
}
