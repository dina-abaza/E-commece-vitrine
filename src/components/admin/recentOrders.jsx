
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/customerStore/authStore";

export default function RecentOrders() {
  const token = useAuthStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          "",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // نتأكد أن البيانات مصفوفة قبل الحفظ
        if (Array.isArray(res.data)) {
          setOrders(res.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("حدث خطأ أثناء تحميل الطلبات");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [token]);

  if (loading) return <p>جاري تحميل الطلبات...</p>;
  if (error) return <p>{error}</p>;

  if (orders.length === 0) return <p className="mt-10 text-red-700">لا توجد طلبات حالياً.</p>;

  return (
    <div className="p-4 bg-white rounded shadow max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-4">الطلبات الأخيرة</h3>
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">رقم الطلب</th>
            <th className="border p-2">اسم العميل</th>
            <th className="border p-2">تاريخ الطلب</th>
            <th className="border p-2">الحالة</th>
            <th className="border p-2">الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.customerName || "غير متوفر"}</td>
              <td className="border p-2">{order.date || "غير متوفر"}</td>
              <td className="border p-2">{order.status || "غير متوفر"}</td>
              <td className="border p-2">{order.total ? `${order.total} جنيه` : "غير متوفر"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
