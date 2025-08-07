
import React, { useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";
import UseVerifyAdmin from "../../hooks/useverifyadmin";
import UseFetchUsers from "../../hooks/useFetchUsers";

export default function AdminSettings() {
  UseVerifyAdmin();

  const token = AdminUseAuthStore((state) => state.token);
  const { users, loadingUsers } = UseFetchUsers();

  const [selectedId, setSelectedId] = useState('');
  const [selectRole, setSelectRole] = useState('admin');
  const [loadingRole, setLoadingRole] = useState(false);
  const [messageRole, setMessageRole] = useState('');

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [newAdminLoading, setNewAdminLoading] = useState(false);
  const [newAdminMessage, setNewAdminMessage] = useState("");

  const handleNewAdminChange = (e) => {
    setNewAdmin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNewAdminSubmit = async (e) => {
    e.preventDefault();
    setNewAdminLoading(true);
    setNewAdminMessage("");
    try {
      await axios.post('https://e-commece-vitrine-api.vercel.app/api/add-admin', newAdmin, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
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

  const handleUpdateRole = async () => {
    if (!selectedId) return setMessageRole("اختر مستخدم أولاً.");

    setLoadingRole(true);
    setMessageRole("");
    try {
      await axios.put(
        `https://e-commece-vitrine-api.vercel.app/api/update-role/${selectedId}`,
        { newRole: selectRole },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setMessageRole("تم تحديث الدور بنجاح.");
      setSelectedId('')
      setSelectRole('')
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);

      setMessageRole("حدث خطأ أثناء تحديث الدور.");
    } finally {
      setLoadingRole(false);
    }
  };

  return (
    <div className="animate-slideInFromLeft w-full max-w-4xl mx-auto bg-white rounded shadow p-8 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* إضافة أدمن جديد */}
        <form onSubmit={handleNewAdminSubmit} className="flex flex-col gap-5">
          <h3 className="text-xl font-bold text-green-600">إضافة أدمن جديد</h3>

          <input
            type="text"
            name="name"
            placeholder="اسم الأدمن"
            value={newAdmin.name}
            onChange={handleNewAdminChange}
            className="p-4 rounded border border-gray-300 shadow-md outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={newAdmin.email}
            onChange={handleNewAdminChange}
            className="p-4 rounded border border-gray-300 shadow-md outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={newAdmin.password}
            onChange={handleNewAdminChange}
            className="p-4 rounded border border-gray-300 shadow-md outline-none"
            required
          />

          <button
            type="submit"
            disabled={newAdminLoading}
            className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:brightness-110 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {newAdminLoading ? "جاري الإضافة..." : "إضافة أدمن جديد"}
          </button>

          {newAdminMessage && <p className="text-sm mt-2 text-gray-600">{newAdminMessage}</p>}
        </form>

        {/* تعديل دور مستخدم */}
        <div className="flex flex-col gap-5">
          <h3 className="text-xl font-bold text-blue-800">تعديل دور مستخدم</h3>

          <select
            className="p-4 rounded border border-gray-300 shadow-md outline-none"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            required
          >
            <option value="">-- اختر مستخدم --</option>
            {loadingUsers ? (
              <option disabled>جاري التحميل...</option>
            ) : (
              users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))
            )}
          </select>

          <select
            className="p-4 rounded border border-gray-300 shadow-md outline-none"
            value={selectRole}
            onChange={(e) => setSelectRole(e.target.value)}
          >
            <option value="admin">أدمن</option>
            <option value="user">مستخدم</option>
          </select>

          <button
            onClick={handleUpdateRole}
            disabled={loadingRole}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:brightness-110 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingRole ? "جاري التحديث..." : "تحديث الدور"}
          </button>

          {messageRole && <p className="text-lg mt-2 text-green-600">{messageRole}</p>}
        </div>

      </div>
    </div>
  );
}
