
import React, { useState } from "react";
import axios from "axios";
import useCartStore from "../../store/customerStore/cartStore";
import useAuthStore from "../../store/customerStore/authStore";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const cartItems = useCartStore((state) => state.cartItems);
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const clearCart = useCartStore((state) => state.clearCart);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.offer.discountedPrice * item.quantity,
    0
  );

  const handleSubmit = async () => {
    if (!token) {
      alert("❗ يرجى تسجيل الدخول أولاً قبل تنفيذ عملية الشراء.");
      return;
    }

    if (!customerName || !phone || !address) {
      alert("من فضلك املأ جميع بيانات العميل.");
      return;
    }

    try {
      setError(null);

  
      const preparedCartItems = cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      if (paymentMethod === "credit_card") {
      
        const response = await axios.post(
          "https://e-commece-vitrine-api.vercel.app/api/stripe/create-checkout-session",
          { cartItems: preparedCartItems },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const checkoutUrl = response.data.url;
        if (checkoutUrl) {
          window.location.href = checkoutUrl;
        } else {
          setError("❌ لم يتم استلام رابط الدفع.");
        }
      } else {
      
       await axios.post(
          "https://e-commece-vitrine-api.vercel.app/api/cash-on-delivery",
          {
            cartItems: preparedCartItems,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );        
        
        clearCart();
        setSuccessMessage("✅ تم تسجيل طلبك للدفع عند الاستلام. سيتم التواصل معك.");
        setTimeout(()=>{navigate("/") },2000)    
      }
    } catch (err) {
      console.error("خطأ في الدفع:", err);
      setError("❌ حدث خطأ أثناء تأكيد الطلب. حاول مرة أخرى.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-2xl font-bold">قم بمتابعة طلبك  من الان</p>
      </div>
    );
  }

  return (
    <div className="animate-slideInFromLeft max-w-5xl mx-auto shadow-lg rounded p-6 mt-10 bg-white">
      <div className="flex flex-col md:flex-row gap-6 items-start">
      
        <div className="flex-1 max-h-[500px] overflow-y-auto border p-4 rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">مراجعة المنتجات</h3>
          {cartItems.map((item) => (
            <div key={item._id} className="mb-4 border-b pb-2">
              <div className="flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>الكمية: {item.quantity}</p>
                  <p>السعر: {item.price} جنيه</p>
                  <p>
                    السعر بعد الخصم: <span className="text-green-600 font-bold">{item.offer.discountedPrice}جنيه</span>
                  </p> 
                  
                  <p>الإجمالي: {item.offer.discountedPrice * item.quantity} جنيه</p>
                </div>
              </div>
            </div>
          ))}
          <p className="font-bold text-lg mt-2">المجموع الكلي: {totalPrice} جنيه</p>
        </div>

        
        <div className="flex-1 mt-6 md:mt-0 border p-4 rounded bg-gray-50">
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

          {error && <div className="text-red-600 mt-4">{error}</div>}
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
