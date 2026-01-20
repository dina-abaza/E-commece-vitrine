import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";
import { FaBoxOpen, FaCheckCircle, FaTimesCircle, FaUndoAlt, FaHourglassHalf, FaClipboardCheck, FaTruck } from "react-icons/fa";
import UseVerifyAdmin from "../../hooks/useverifyadmin";
import UseFetchOrders from "../../hooks/useFetchOrders";
import UseFetchUsers from "../../hooks/useFetchUsers";

const statusIcons = {
  pending: <FaHourglassHalf className="text-yellow-500" />,
  confirmed: <FaClipboardCheck className="text-blue-500" />,
  processing: <FaBoxOpen className="text-purple-500" />,
  shipped: <FaTruck className="text-cyan-600" />,
  delivered: <FaCheckCircle className="text-green-600" />,
  cancelled: <FaTimesCircle className="text-red-600" />,
  returned: <FaUndoAlt className="text-orange-500" />,
  failed: <FaTimesCircle className="text-gray-500" />,
};

const allStatuses = [
  "pending", "confirmed", "processing",
  "shipped", "delivered", "cancelled",
  "returned", "failed"
];

export default function AdminOrders() {
UseVerifyAdmin()

  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const token = AdminUseAuthStore((state) => state.token);
  const {loading,error,orders,setOrders}=UseFetchOrders()
  const {users}= UseFetchUsers()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const query = new URLSearchParams();
        if (userId) query.append("userId", userId);
        if (status) query.append("status", status);

        const res = await axios.get(`https://e-commece-vitrine-api.vercel.app/api/admin/orders?${query.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials:true
        });
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error("❌ خطأ في تحميل الطلبات", err);
      }
    };
    fetchOrders();
  }, [userId, status, token]);

  const getUserName = (id) => {
    const user = users.find((u) => u._id === id);
    return user?.name || user?.email || "مستخدم غير معروف";
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(
        `https://e-commece-vitrine-api.vercel.app/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("✅ تم التحديث:", res.data);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("❌ فشل تغيير الحالة", err);
      alert("حدث خطأ أثناء تحديث الحالة.");
    }
  };

  return (
    <div className="animate-fadeInUp p-4 max-w-6xl mx-auto mt-10">

       {loading && <p className="text-yellow-600 text-center">جاري التحميل...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <h1 className="text-2xl font-bold text-blue-900 mb-8">لوحة الطلبات</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <select onChange={(e) => setUserId(e.target.value)} className="shadow-lg px-4 py-2 rounded-xl w-full sm:w-auto">
          <option value="">كل المستخدمين</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name || user.email}
            </option>
          ))}
        </select>

        <select onChange={(e) => setStatus(e.target.value)} className="shadow-lg px-4 py-2 rounded-xl w-full sm:w-auto">
          <option value="">كل الحالات</option>
          {allStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      
      {!Array.isArray(orders) || !orders.length ? (
        <p className="text-gray-600">لا توجد طلبات.</p>
      ) : (
        <div className="space-y-10">
          {orders.map((order) => (
            <div key={order._id} className="border-l border-blue-950 rounded-xl p-5 shadow-md bg-white space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 flex-wrap">
                <div className="flex items-center gap-2 min-w-[200px] text-right">
                  <span className="font-bold">رقم الطلب:</span>
                  <span className="text-gray-800 break-all">{order._id}</span>
                </div>

                <div className="flex items-center gap-2 min-w-[200px] text-right">
                  <span className="font-bold">المستخدم:</span>
                  <span className="text-gray-800">{getUserName(order.userId)}</span>
                </div>

                <div className="flex items-center gap-2 min-w-[200px] text-right">
                  <span className="font-bold">الحالة:</span>
                  {statusIcons[order.status]}
                  <span className="text-gray-800">{order.status}</span>
                </div>

                <div className="flex items-center gap-2 min-w-[200px] text-right">
                  <span className="font-bold">التاريخ:</span>
                  <span className="text-gray-800">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700 mb-2">المنتجات:</h3>
                {order.products?.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b pb-2 mb-2">
                    <img src={item.productId?.image} alt={item.productId?.title} className="w-16 h-16 rounded object-cover" />
                    <div>
                      <p className="font-semibold">{item.productId?.title || "اسم غير متاح"}</p>
                      <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                      <p className="text-sm text-gray-600">السعر: {item.productId?.price} جنيه</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 items-center mt-4">
                <select
                  className="px-3 py-1 rounded-md text-sm border border-gray-300 shadow-sm outline-none bg-pink-100 hover:bg-pink-200 transition"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {allStatuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


