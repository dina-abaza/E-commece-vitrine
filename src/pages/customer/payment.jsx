
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


  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get("https://e-commece-vitrine-api.vercel.app/api/products");
        const foundProduct = res.data.find(p => p._id === productId);
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

  const handleSubmit = async () => {
    if (!customerName || !phone || !address) {
      alert("من فضلك املأ جميع بيانات العميل.");
      return;
    }
    setError(null)
    try {
       await axios.post("", {
        productId,
        quantity,
        color,
        paymentMethod,
        totalPrice,
        customerName,
        phone,
        address,
      });

      setSuccessMessage("✅ تم إرسال الطلب بنجاح! سيتم التواصل معك قريبًا.");
    } catch (err) {
      console.error(err);
      alert("❌ حدث خطأ أثناء تأكيد الطلب. حاول مرة أخرى.");
    }
  };

  return (
    <div className="animate-slideInFromLeft max-w-4xl mx-auto shadow-lg rounded p-6 mt-10 bg-white">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="md:w-1/2">
          <h3 className="text-lg font-semibold mb-2">تفاصيل المنتج</h3>
          <img src={product.image} alt={product.name} className="w-full rounded mb-4" />
          <p>اسم المنتج: {product.name}</p>
          <p>اللون: {color || "لم يتم الاختيار"}</p>
          <p>الكمية: {quantity}</p>
          <p>سعر الوحدة: {product.price} جنيه</p>
          <p className="font-bold text-lg mt-2">المجموع: {totalPrice} جنيه</p>
        </div>
        
        <div className="md:w-1/2 mt-6 md:mt-14">

          <h3 className="text-lg font-semibold mb-2">طريقة الدفع</h3>
          <label className="block mb-2">
            <input
              type="radio"
              value="credit_card"
              checked={paymentMethod === "credit_card"}
              onChange={() => setPaymentMethod("credit_card")}
            />
            <span className="ml-2">بطاقة ائتمان</span>
          </label>
          <label className="block mb-4">
            <input
              type="radio"
              value="cash_on_delivery"
              checked={paymentMethod === "cash_on_delivery"}
              onChange={() => setPaymentMethod("cash_on_delivery")}
            />
            <span className="ml-2">الدفع عند الاستلام</span>
          </label>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">بيانات العميل</h4>
            <input
              type="text"
              placeholder="الاسم"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <input
              type="text"
              placeholder="العنوان"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 w-full"
          >
            تأكيد الدفع
          </button>
          {error&&<div  className="text-red-600">{error}</div>}

          {successMessage && (
            <div className="mt-4 bg-green-100 text-green-700 p-3 rounded">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
