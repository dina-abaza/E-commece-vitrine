
import React, { useState } from "react";
import axios from "axios";
import UseVerifyAdmin from "../../hooks/useverifyadmin";
import UseFetchProducts from "../../hooks/useFetchProducts";
import AdminUseAuthStore from "../../store/adminStore/adminAuthStore";

export default function AdminProducts() {
UseVerifyAdmin()

  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const {error,loading,products,setProducts}= UseFetchProducts()
  const token = AdminUseAuthStore((state) => state.token); 


  const handleEditClick = (product) => {
    setEditingId(product._id);
    setEditedProduct({
      name: product.name,
      price: product.price,
      discountedPrice: product.offer?.discountedPrice || "",
      categoryId: product.categoryId || "",
      image: null,
      _id: product._id,
    });
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setEditedProduct((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setEditedProduct((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    if (editedProduct.name) formData.append("name", editedProduct.name);
    if (editedProduct.price) formData.append("price", editedProduct.price);
    if (editedProduct.discountedPrice)
      formData.append("discountedPrice", editedProduct.discountedPrice);
    if (editedProduct.categoryId)
      formData.append("categoryId", editedProduct.categoryId);
    if (editedProduct.image)
      formData.append("image", editedProduct.image);

    try {
      const res = await axios.patch(
        `https://e-commece-vitrine-api.vercel.app/api/editproduct/${editedProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },  withCredentials: true,

        }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === editedProduct._id ? { ...p, ...res.data.product } : p
        )
      );
      setEditingId(null);
      setEditedProduct({});
    } catch (err) {
      alert("حدث خطأ أثناء تحديث المنتج: " + (err?.response?.data?.message || err.message));

    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      await axios.delete(
        `https://e-commece-vitrine-api.vercel.app/api/deleteproduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
            withCredentials: true,

        }
      );
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
            alert("فشل في حذف المنتج " + (err?.response?.data?.message || err.message));

    }
  };

  return (
    <div className="animate-slideInFromLeft max-w-6xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold text-center mb-6">إدارة المنتجات</h2>

      {loading ? (
        <p>جارٍ تحميل المنتجات...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
        
          <div className="md:hidden space-y-4">
            {products.map((product) => (
              <div key={product._id} className="border p-4 rounded shadow">
                {editingId === product._id ? (
                  <input type="file" name="image" onChange={handleChange} />
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover mb-2"
                  />
                )}

                <div className="space-y-1">
                  <div>
                    <strong>الاسم:</strong>{" "}
                    {editingId === product._id ? (
                      <input
                        name="name"
                        value={editedProduct.name}
                        onChange={handleChange}
                        className="w-full border p-1"
                      />
                    ) : (
                      product.name
                    )}
                  </div>

                  <div>
                    <strong>السعر:</strong>{" "}
                    {editingId === product._id ? (
                      <input
                        type="number"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleChange}
                        className="w-full border p-1"
                      />
                    ) : (
                      `${product.price} جنيه`
                    )}
                  </div>

                  <div>
                    <strong>الخصم:</strong>{" "}
                    {editingId === product._id ? (
                      <input
                        type="number"
                        name="discountedPrice"
                        value={editedProduct.discountedPrice}
                        onChange={handleChange}
                        className="w-full border p-1"
                      />
                    ) : product.offer?.discountedPrice ? (
                      `${product.offer.discountedPrice} جنيه`
                    ) : (
                      "-"
                    )}
                  </div>

                  <div>
                    <strong>التصنيف:</strong>{" "}
                    {editingId === product._id ? (
                      <input
                        type="text"
                        name="categoryId"
                        value={editedProduct.categoryId}
                        onChange={handleChange}
                        className="w-full border p-1"
                      />
                    ) : (
                      product.categoryId
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-3 justify-end">
                  {editingId === product._id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      حفظ
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(product)}
                        className="bg-blue-600 text-white px-2 py-1 rounded"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        حذف
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          
          <div className="hidden md:block overflow-auto mt-6">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">صورة</th>
                  <th className="border p-2">الاسم</th>
                  <th className="border p-2">السعر</th>
                  <th className="border p-2">سعر الخصم</th>
                  <th className="border p-2">التصنيف</th>
                  <th className="border p-2">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="border p-2 text-center">
                      {editingId === product._id ? (
                        <input
                          type="file"
                          name="image"
                          onChange={handleChange}
                        />
                      ) : (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-24 h-16 object-cover mx-auto"
                        />
                      )}
                    </td>
                    <td className="border p-2">
                      {editingId === product._id ? (
                        <input
                          name="name"
                          value={editedProduct.name}
                          onChange={handleChange}
                          className="w-full border p-1"
                        />
                      ) : (
                        product.name
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      {editingId === product._id ? (
                        <input
                          type="number"
                          name="price"
                          value={editedProduct.price}
                          onChange={handleChange}
                          className="w-full border p-1"
                        />
                      ) : (
                        `${product.price} جنيه`
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      {editingId === product._id ? (
                        <input
                          type="number"
                          name="discountedPrice"
                          value={editedProduct.discountedPrice}
                          onChange={handleChange}
                          className="w-full border p-1"
                        />
                      ) : product.offer?.discountedPrice ? (
                        `${product.offer.discountedPrice} جنيه`
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      {editingId === product._id ? (
                        <input
                          type="text"
                          name="categoryId"
                          value={editedProduct.categoryId}
                          onChange={handleChange}
                          className="w-full border p-1"
                        />
                      ) : (
                        product.categoryId
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      {editingId === product._id ? (
                        <button
                          onClick={handleSave}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          حفظ
                        </button>
                      ) : (
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="bg-blue-600 text-white px-2 py-1 rounded"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-600 text-white px-2 py-1 rounded"
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
        </>
      )}
    </div>
  );
}
