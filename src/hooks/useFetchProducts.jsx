import { useEffect, useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../store/adminStore/adminAuthStore";

export default function UseFetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const token = AdminUseAuthStore((state) => state.token);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          "https://e-commece-vitrine-api.vercel.app/api/products",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setProducts(res.data); 
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(
          err.response?.data?.message || "حدث خطأ أثناء تحميل المنتجات"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [token]);

  return { products, loading, error, setProducts };
}
