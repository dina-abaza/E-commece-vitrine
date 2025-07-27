import React from "react";
import Card from "../../components/admin/card";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";
import UseVerifyAdmin from "../../hooks/useverifyadmin";
import UseFetchUsers from "../../hooks/useFetchUsers";
import UseFetchOrders from "../../hooks/useFetchOrders";
import UseFetchProducts from "../../hooks/useFetchProducts";

export default function HomeDashboard() {
  UseVerifyAdmin();

  const token = AdminUseAuthStore((state) => state.token);

  const { users, loading: loadingUsers } = UseFetchUsers(token);
  const { orders, loading: loadingOrders } = UseFetchOrders(token);
  const { products, loading: loadingProducts } = UseFetchProducts(token);

  const loading = loadingUsers || loadingProducts || loadingOrders;

  const recentOrders = [...orders].reverse().slice(0, 5);

  const revenue = orders.reduce((total, order) => {
    const orderTotal =
      order.products?.reduce((sum, p) => {
        const price = p.productId?.price || 0;
        const quantity = p.quantity || 0;
        return sum + price * quantity;
      }, 0) || 0;
    return total + orderTotal;
  }, 0);

  const stats = {
    users: users.length,
    products: products.length,
    orders: orders.length,
    revenue: revenue.toFixed(2),
  };

  const getUserName = (id) => {
    const user = users.find((u) => u._id === id);
    return user?.name || user?.email || "مستخدم غير معروف";
  };

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

      <div className="mt-10 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-blue-900">الطلبات الأخيرة</h3>
          <a
            href="/admin/orders"
            className="text-sm text-blue-600 hover:underline hover:text-blue-800 transition"
          >
            عرض الكل →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-right text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-700 bg-gray-100">
                <th className="p-3 rounded-s-md">رقم</th>
                <th className="p-3">العميل</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3">الحالة</th>
                <th className="p-3 rounded-e-md">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="bg-white hover:bg-gray-50 transition duration-150 shadow-sm"
                >
                  <td className="p-3 font-medium text-blue-800">
                    {order._id.slice(-5)}
                  </td>
                  <td className="p-3">{getUserName(order.userId)}</td>
                  <td className="p-3">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "confirmed"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-800 font-semibold">
                    {order.products
                      ?.reduce((sum, p) => {
                        const price = p.productId?.price || 0;
                        const quantity = p.quantity || 0;
                        return sum + price * quantity;
                      }, 0)
                      .toFixed(2)}{" "}
                    ج.م
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
