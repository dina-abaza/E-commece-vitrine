
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";

export default function UsersPage() {
  const token = AdminUseAuthStore((state) => state.token);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          setUsers([]);
        }
      } catch (err) {
        console.error("Error loading users:", err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [token]);

  if (loading)
    return (
      <p className="p-6 text-center text-lg text-gray-700">جاري تحميل المستخدمين...</p>
    );

  return (
    <div className="animate-slideInFromLeft w-full max-w-3xl p-4 md:p-6 min-h-screen mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 text-center">قائمة المستخدمين</h2>

    
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full border border-gray-300 table-auto text-center">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="border border-gray-300 p-2">الاسم</th>
              <th className="border border-gray-300 p-2">البريد الإلكتروني</th>
              <th className="border border-gray-300 p-2">رقم الهاتف</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-red-600">
                  لا يوجد مستخدمين حتى الآن.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="text-gray-800 hover:bg-gray-100"
                >
                  <td className="border border-gray-300 p-2">{user.name || "-"}</td>
                  <td className="border border-gray-300 p-2">{user.email || "-"}</td>
                  <td className="border border-gray-300 p-2">{user.phone || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
