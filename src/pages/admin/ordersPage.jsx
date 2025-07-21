import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const token =AdminUseAuthStore((state)=>state.token)
 

  
  useEffect(()=>{
 const fetchUsers = async () => {
    try {
      const res = await axios.get("https://e-commece-vitrine-api.vercel.app/api/Users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error("خطأ في جلب المستخدمين",err);
    }
  };
  
  fetchUsers()
  },[])
 


  useEffect(()=>{
  const fetchOrders = async () => {
    try {
      const query = new URLSearchParams();
      if (userId) query.append("userId", userId);
      if (status) query.append("status", status);

    
      const res =await axios.get(`https://e-commece-vitrine-api.vercel.app/api/admin/orders?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("خطأ في تحميل الطلبات",err);
    }
  };
  
  fetchOrders()
  },[userId,status])

 


  return (
    <div className="p-4 max-w-6xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">لوحة الطلبات</h1>

    
      <div className="flex flex-wrap gap-4 mb-6">
        <select onChange={(e) => setUserId(e.target.value)} className="border px-3 py-2 rounded w-full sm:w-auto">
          <option value="">كل المستخدمين</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name || user.email}
            </option>
          ))}
        </select>

        <select onChange={(e) => setStatus(e.target.value)} className="border px-3 py-2 rounded w-full sm:w-auto">
          <option value="">كل الحالات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="completed">مكتمل</option>
          <option value="cancelled">ملغي</option>
        </select>
      </div>

    
      {orders.length === 0 ? (
        <p>لا توجد طلبات.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded p-4 shadow-sm bg-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
              
                  <p className="font-bold text-gray-800">رقم الطلب: {order._id}</p>
                  <p className="text-sm text-gray-600">المستخدم: {order.userId}</p>
                  <p className="text-sm text-gray-600">الحالة: {order.status}</p>
                  <p className="text-sm text-gray-600">بتاريخ: {new Date(order.createdAt).toLocaleString()}</p>
              
              </div>

  
        <div className="mt-2">
          <h3 className="font-semibold mb-2">المنتجات:</h3>
          <div className="space-y-2">
             {order.products.map((item) => (
              <div key={item._id} className="flex items-center gap-4 border-b pb-2">
                <img
                src={item.productId.image }
                alt={item.productId.title }
                className="w-16 h-16 object-cover rounded"
            />
          <div>
            <p className="font-semibold">{item.productId.title || "اسم غير متاح"}</p>
            <p className="text-sm text-gray-600">الكمية: {item.productId.quantity}</p>
            <p className="text-sm text-gray-600">السعر: {item.productId.price} جنيه</p>
          </div>
        </div>
       ))}
       </div>
      </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
