import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/customerStore/authStore";

export default function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    async function fetchOrdersAndProducts() {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          axios.get("https://e-commece-vitrine-api.vercel.app/api/user/orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://e-commece-vitrine-api.vercel.app/api/products"),
        ]);

        setMyOrders(ordersRes.data);
        setAllProducts(productsRes.data);
      } catch (error) {
        console.error("فشل في جلب البيانات", error);
      }
    }

    fetchOrdersAndProducts();
  }, [])

  
  function getProductDetails(productId) {
    return allProducts.find((p) => p._id === productId);
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">طلباتي</h2>

      <div className="mb-6">
        <p className="font-semibold">
          الإيميل: <span className="font-normal">{myOrders.userEmail}</span>
        </p>
        <p className="font-semibold">
          الاسم: <span className="font-normal">{myOrders.userName}</span>
        </p>
      </div>

      {myOrders.orders?.map((order, index) => (
        <div key={index} className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm">
          <div className="mb-2">
            <p className="font-semibold">
              رقم الطلب: <span className="font-normal">{order._id}</span>
            </p>
            <p className="font-semibold">
              التاريخ: <span className="font-normal">{new Date(order.createdAt).toLocaleDateString()}</span>
            </p>
            <p className="font-semibold">
              الحالة: <span className="text-blue-600">{order.status}</span>
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">المنتجات:</h3>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {order.products.map((product, i) => {
                const fullProduct = getProductDetails(product.productId);

                return (
                  <div
                    key={i}
                    className="border rounded p-2 flex flex-col items-center text-center"
                  >
                    {fullProduct?.image && (
                      <img
                        src={fullProduct.image}
                        alt={fullProduct.name}
                        className="w-20 h-20 object-cover mb-2 rounded"
                      />
                    )}
                    <h4 className="font-bold">
                      {fullProduct?.name || "اسم غير متوفر"}
                    </h4>
                    <p className="text-gray-700">الكمية: {product.quantity}</p>
                    <p className="text-gray-700">السعر: {product.price} جنيه</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
