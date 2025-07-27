import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminUseAuthStore from "../store/adminStore/adminAuthStore";

export default function UseFetchOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = AdminUseAuthStore((state) => state.token);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(
          "https://e-commece-vitrine-api.vercel.app/api/admin/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
            withCredentials: true,
          }
        );
        setOrders(res.data.orders || []);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || "حدث خطأ أثناء جلب الطلبات");
        console.error("خطأ أثناء جلب الطلبات", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [token]);

  return { orders, setOrders, loading, error };
}
