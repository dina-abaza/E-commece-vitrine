import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../store/customerStore/authStore";

export default function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const token = useAuthStore((state) => state.token);

  
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(
          "https://e-commece-vitrine-api.vercel.app/api/user/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMyOrders(res.data);
      } catch (error) {
        console.error("فشل في جلب الطلبات", error);
      }
    }

    fetchOrders();
  }, [token]);

  
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          "https://e-commece-vitrine-api.vercel.app/api/products"
        );
        setAllProducts(res.data);
      } catch (error) {
        console.error("فشل في جلب المنتجات", error);
      }
    }

    fetchProducts();
  }, []);

  const getProductDetails = (productId) => {
    return allProducts.find((p) => p._id === productId);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-6 text-sm sm:text-base">
        <p className="font-semibold">
          الإيميل: <span className="font-normal">{myOrders.userEmail}</span>
        </p>
        <p className="font-semibold">
          الاسم: <span className="font-normal">{myOrders.userName}</span>
        </p>
      </div>

      {myOrders.orders?.map((order, index) => (
        <div
          key={index}
          className="border-l-4 border-yellow-600 bg-white rounded-lg p-4 mb-6 shadow-md"
        >
          <div className="mb-3 space-y-1 text-sm sm:text-base">
            <div className="flex gap-5 items-center">
              <span className="font-semibold text-gray-800">رقم الطلب:</span>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-sm tracking-wide">
                #{order._id.slice(-5)}
              </span>
            </div>

            <div className="flex gap-5 items-center">
              <span className="font-semibold text-gray-800">التاريخ:</span>
              <span className="text-gray-700">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex gap-5 items-center">
              <span className="font-semibold text-gray-800">الحالة:</span>
              <span className="text-blue-600 font-medium">{order.status}</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-gray-800">المنتجات:</h3>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {order.products.map((product, index) => {
                const fullProduct = getProductDetails(product.productId);

                return (
                  <div
                    key={index}
                    className="border border-white  shadow-lg rounded p-2 flex flex-col items-center text-center"
                  >
                    {fullProduct?.image && (
                      <img
                        src={fullProduct.image}
                        alt={fullProduct.name}
                        className="w-20 h-20 object-cover mb-2 rounded"
                      />
                    )}
                    <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                      {fullProduct?.name || "اسم غير متوفر"}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      الكمية: {product.quantity}
                    </p>
                    <p className="text-gray-700 text-sm">
                      السعر: {product.price} جنيه
                    </p>
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
