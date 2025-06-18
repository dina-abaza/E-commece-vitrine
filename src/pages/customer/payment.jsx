import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const productId = query.get("id");
  const color = query.get("color");
  const quantity = Number(query.get("quantity")) || 1;

  const [product, setProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get("https://e-commece-vitrine-api.vercel.app/api/products");
        const foundProduct = res.data.find(p => p.id === productId);
        if (!foundProduct) {
          setError("المنتج غير موجود");
        } else {
          setProduct(foundProduct);
        }
      } catch (err) {
      setError(`حدث خطأ أثناء جلب بيانات المنتج: ${err.message}`);

      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return null;

  const totalPrice = product.price * quantity;

  return (
    <div className="max-w-3xl flex gap-8">

      <div className="w-1/2">
        <h3 className="text-lg font-semibold">تفاصيل المنتج</h3>
        <p>اسم المنتج: {product.name}</p>
        <p>اللون: {color || "لم يتم الاختيار"}</p>
        <p>الكمية: {quantity}</p>
        <p>سعر الوحدة: {product.price} جنيه</p>
        <p className="font-bold">المجموع: {totalPrice} جنيه</p>
      </div>

      <div className="w-1/2">
        <h3 className="text-lg font-semibold mb-2">طريقة الدفع</h3>
        <label className="block mb-1">
          <input
            type="radio"
            name="paymentMethod"
            value="credit_card"
            checked={paymentMethod === "credit_card"}
            onChange={() => setPaymentMethod("credit_card")}
          />{" "}
          بطاقة ائتمان
        </label>
        <label className="block mb-1">
          <input
            type="radio"
            name="paymentMethod"
            value="cash_on_delivery"
            checked={paymentMethod === "cash_on_delivery"}
            onChange={() => setPaymentMethod("cash_on_delivery")}
          />{" "}
          الدفع عند الاستلام
        </label>
      </div>

      <button
        className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
        onClick={() => alert(`تم اختيار طريقة الدفع: ${paymentMethod}\nالمبلغ: ${totalPrice} جنيه`)}
      >
        تأكيد الدفع
      </button>
    </div>
  );
}
