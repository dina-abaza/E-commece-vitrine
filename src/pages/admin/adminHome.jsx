
import React, { useEffect, useState } from "react";
import Card from "../../components/admin/card";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";
import RecentOrders from "../../components/admin/recentOrders";

export default function HomeDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const token = AdminUseAuthStore((state) => state.token);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axios.get("", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Error loading stats:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <p>جاري تحميل البيانات ...</p>;

  return (
    <div className="animate-slideInFromLeft w-full max-w-3xl p-4 sm:p-6 md:p-10">
      <h2 className="text-2xl font-bold my-10 text-blue-900">
        لوحة التحكم الرئيسية
      </h2>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card
          title="عدد المنتجات"
          value={stats.products}
          bgColor="bg-blue-100 text-blue-900"
        />
        <Card
          title="عدد المستخدمين"
          value={stats.users}
          bgColor="bg-green-100 text-green-900"
        />
        <Card
          title="عدد الطلبات"
          value={stats.orders}
          bgColor="bg-yellow-100 text-yellow-900"
        />
        <Card
          title="إجمالي الإيرادات"
          value={`${stats.revenue} جنيه`}
          bgColor="bg-purple-100 text-purple-900"
        />
      </div>

  
      <div className="mt-10">
        <RecentOrders />
      </div>
    </div>
  );
}
