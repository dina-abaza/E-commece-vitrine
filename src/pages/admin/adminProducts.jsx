
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";

export default function AdminProducts() {
  const token = AdminUseAuthStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://e-commece-vitrine-api.vercel.app/api/products",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProducts(res.data);
        setError(null);
      } catch (err) {
        setError(`"حدث خطأ أثناء جلب المنتجات",${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [token]);

  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditedProduct(product);
  };

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!editedProduct.name.trim() || !editedProduct.price) {
      alert("يرجى تعبئة الاسم والسعر");
      return;
    }
    try {
      await axios.put(
        `https://e-commece-vitrine-api.vercel.app/api/products/${editedProduct._id}`,
        editedProduct,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === editedProduct._id ? editedProduct : p))
      );
      setEditingId(null);
      setEditedProduct({});
    } catch (error) {
      alert("حدث خطأ أثناء تحديث المنتج");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف المنتج؟")) return;

    try {
      await axios.delete(
        `https://e-commece-vitrine-api.vercel.app/api/products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert("حدث خطأ أثناء حذف المنتج");
      console.error(error);
    }
  };

  if (loading)
    return <p className="text-center mt-10">جارٍ تحميل المنتجات...</p>;
  if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

  return (
    <div className="animate-slideInFromLeft w-full max-w-6xl mx-auto p-6 bg-white rounded shadow mt-10 ">
      <h2 className="text-2xl font-bold mb-6 text-center">إدارة المنتجات</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">صورة</th>
            <th className="border border-gray-300 p-2">الاسم</th>
            <th className="border border-gray-300 p-2">السعر</th>
            <th className="border border-gray-300 p-2">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border border-gray-300">
              <td className="border border-gray-300 p-2 text-center">
                {editingId === product._id ? (
                  <input
                    type="text"
                    name="image"
                    value={editedProduct.image}
                    onChange={handleChange}
                    className="w-24 rounded border border-gray-300 p-1"
                  />
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-40 h-16 object-cover mx-auto rounded"
                  />
                )}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {editingId === product._id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-1"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {editingId === product._id ? (
                  <input
                    type="number"
                    name="price"
                    value={editedProduct.price}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-1"
                  />
                ) : (
                  `${product.price} جنيه`
                )}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {editingId === product._id ? (
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm"
                  >
                    حفظ
                  </button>
                ) : (
                  <div className="flex flex-col md:flex-row md:space-x-2 space-y-1 md:space-y-0 justify-center items-center">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm w-full md:w-auto"
                    >
                      تعديل
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm w-full md:w-auto"
                    >
                      حذف
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
