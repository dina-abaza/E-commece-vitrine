
import React, { useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";
import UseVerifyAdmin from "../../hooks/useverifyadmin";
import UseFetchUsers from "../../hooks/useFetchUsers";

export default function AdminSettings() {
UseVerifyAdmin()

  const token = AdminUseAuthStore((state) => state.token);
  const { users, loadingUsers } = UseFetchUsers();

  const [selectedId,setSelectedId]=useState('');
  const [selectRole,setSelectRole]=useState('admin');
  const [loadingRole,setLoadingRole]=useState(false);
  const [messageRole,setMessageRole]=useState('')

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
        withCredentials:true
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
        `https://e-commece-vitrine-api.vercel.app/api/admin/update-role/${selectedId}`,
        { role: selectRole },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setMessageRole("تم تحديث الدور بنجاح.");
    } catch (err) {
      console.error(err);
      setMessageRole("حدث خطأ أثناء تحديث الدور.");
    } finally {
      setLoadingRole(false);
    }
  };


  return (
    <div className="animate-slideInFromLeft w-full max-w-3xl mx-auto bg-white rounded shadow p-6 mt-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

     

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

          <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-900">تعديل دور مستخدم</h3>
          <label className="block mb-2 text-blue-900">
            اختر المستخدم:
            <select
              className="border p-2 w-full rounded"
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
          </label>

          <label className="block mb-2 text-blue-900">
            اختر الدور:
            <select
              className="border p-2 w-full rounded"
              value={selectRole}
              onChange={(e) => setSelectRole(e.target.value)}
            >
              <option value="admin">أدمن</option>
              <option value="user">مستخدم</option>
            </select>
          </label>

          <button
            onClick={handleUpdateRole}
            disabled={loadingRole}
            className="bg-blue-100 text-blue-800 px-5 py-2 rounded-lg border border-blue-300 hover:bg-blue-200 transition duration-300 shadow-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingRole ? "جاري التحديث..." : "تحديث الدور"}
          </button>
          {messageRole && <p className="mt-2">{messageRole}</p>}
        </div>

      </div>
    </div>
  );
}
