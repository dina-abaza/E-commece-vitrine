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
        const res = await axios.get("", { 
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

  if (loading) return <p>جاري تحميل المستخدمين...</p>;

  if (!users.length) return <p className="text-center text-red-600">لا يوجد مستخدمين حتى الآن.</p>;

  return (
    <div className="animate-slideInFromLeft p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-950">قائمة المستخدمين</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">الاسم</th>
            <th className="border border-gray-300 p-2">البريد الإلكتروني</th>
            <th className="border border-gray-300 p-2">رقم الهاتف</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 p-2">{user.name || "-"}</td>
              <td className="border border-gray-300 p-2">{user.email || "-"}</td>
              <td className="border border-gray-300 p-2">{user.phone || "-"}</td>
           
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
