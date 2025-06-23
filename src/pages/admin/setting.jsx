import React, { useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";

export default function AdminSettings() {
  const token = AdminUseAuthStore((state) => state.token);

  // حالة تعديل بيانات الأدمن الحالي
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");

  // حالة إضافة أدمن جديد
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [newAdminLoading, setNewAdminLoading] = useState(false);
  const [newAdminMessage, setNewAdminMessage] = useState("");

  // دالة تغيير حقول تعديل الأدمن الحالي
  function handleAdminChange(e) {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  }

  // دالة تغيير حقول إضافة أدمن جديد
  function handleNewAdminChange(e) {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  }

  // إرسال تعديل بيانات الأدمن الحالي
  async function handleAdminSubmit(e) {
    e.preventDefault();
    setAdminLoading(true);
    setAdminMessage("");
    try {
      // هنا حطي رابط API تعديل بيانات الأدمن
       await axios.put(
        "", 
        adminData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAdminMessage("تم تحديث بيانات الأدمن بنجاح.");
    } catch (err) {
      console.error(err);
      setAdminMessage("حدث خطأ أثناء تحديث البيانات.");
    } finally {
      setAdminLoading(false);
    }
  }

  // إرسال إضافة أدمن جديد
  async function handleNewAdminSubmit(e) {
    e.preventDefault();
    setNewAdminLoading(true);
    setNewAdminMessage("");
    try {
      // هنا حطي رابط API إضافة أدمن جديد
       await axios.post(
        "", 
        newAdmin,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewAdminMessage("تم إضافة الأدمن الجديد بنجاح.");
      setNewAdmin({ name: "", email: "", password: "" }); // تنظيف الحقول
    } catch (err) {
      console.error(err);
      setNewAdminMessage("حدث خطأ أثناء إضافة الأدمن.");
    } finally {
      setNewAdminLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto  bg-white rounded shadow">
    

      {/* تعديل بيانات الأدمن */}
      <form onSubmit={handleAdminSubmit} className="mb-10">
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
        className="
    bg-blue-100 
    text-blue-800 
    px-5 py-2 rounded-lg 
    border border-blue-300 
    hover:bg-blue-200 
    transition 
    duration-300 
    shadow-sm
    font-bold
    disabled:opacity-50 
    disabled:cursor-not-allowed
  "
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
    className="
    bg-green-100
    text-green-800
    px-5 py-2 rounded-lg
    border border-green-300
    hover:bg-green-200
    transition
    duration-300
    shadow-sm
    font-bold
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
>
  {newAdminLoading ? "جاري الإضافة..." : "إضافة أدمن جديد"}
</button>

        {newAdminMessage && <p className="mt-2">{newAdminMessage}</p>}
      </form>
    </div>
  );
}
