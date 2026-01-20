
import React from "react";
import useCartStore from "../../store/customerStore/cartStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const increaseItem = useCartStore((state) => state.increaseItem);
  const decreaseItem = useCartStore((state) => state.decreaseItem);
  const deletItem = useCartStore((state) => state.deletItem);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="animate-slideInFromLeft max-w-5xl mx-auto p-6 m-10">
      <h2 className="text-2xl font-bold mb-6 text-right">منتجاتك</h2>

      {cartItems.length === 0 ? (
        <p>no products</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-4 mb-4 p-2 border rounded shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-48 h-38 object-cover rounded"
              />
              <div className="flex-1 mr-4 text-right">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">السعر: {item.price} جنيه</p>
                <p className="text-red-600">{item.offer.discountPercent}%</p>
              </div>

              
              <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-1 sm:space-y-0 mt-3 sm:mt-0">

                <div className="flex items-center gap-1 ">
                  <button
                    onClick={() => decreaseItem(item._id)}
                   
                  >
                    -
                  </button>
                  <span className="text-base">{item.quantity}</span>
                  <button
                    onClick={() => increaseItem(item._id)}
                   
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => deletItem(item._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 font-bold text-xl">
            السعر الكلي: {totalPrice} جنيه
          </div>

          <Link to="/payment" className="text-yellow-600 hover:font-semibold">
            اشتري الان
          </Link>
        </>
      )}
    </div>
  );
}
