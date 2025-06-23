import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = AdminUseAuthStore((state) => state.token);

  function renderStatus(status) {
    if (status === "pending") return "قيد الانتظار";
    if (status === "completed") return "مكتمل";
    return "غير معروف";
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [token]);

  if (loading) return <p>جاري تحميل الطلبات ...</p>;

  return (
    <div className="animate-slideInFromLeft p-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">الطلبات</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="text-blue-900">
            <th className="border border-gray-300 p-2">رقم الطلب</th>
            <th className="border border-gray-300 p-2">اسم العميل</th>
            <th className="border border-gray-300 p-2">الإجمالي</th>
            <th className="border border-gray-300 p-2">الحالة</th>
            <th className="border border-gray-300 p-2">التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-red-700">
                لا توجد طلبات حالياً
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="text-center text-red-800">
                <td className="border border-gray-300 p-2">{order.id}</td>
                <td className="border border-gray-300 p-2">{order.user}</td>
                <td className="border border-gray-300 p-2">{order.total} جنيه</td>
                <td className="border border-gray-300 p-2">{renderStatus(order.status)}</td>
                <td className="border border-gray-300 p-2">{order.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
