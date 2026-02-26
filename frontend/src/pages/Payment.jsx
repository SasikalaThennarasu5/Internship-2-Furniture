import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderSummary from "../components/OrderSummary";

import { useCart } from "../context/CartContext";
import { FaCcVisa, FaCcMastercard, FaGooglePay } from "react-icons/fa";
import { SiPhonepe, SiPaytm } from "react-icons/si";

function Payment() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [method, setMethod] = useState("card");

  // Calculate total
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Load Razorpay
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


  
  const handlePayment = async () => {

    console.log("PAY BUTTON CLICKED");
console.log("Total Amount:", totalAmount); 
    // COD option
    if (method === "cod") {
      alert("Order placed successfully (Cash on Delivery)");
      clearCart();
      navigate("/success");
      return;
    }

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    // Create order in backend
    const response = await fetch(
      "http://127.0.0.1:8000/api/payments/create-order/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      }
    );

    if (!response.ok) {
  const text = await response.text();
  console.log("Backend error:", text);
  alert("Backend error. Check console.");
  return;
}

    const data = await response.json();
    console.log("Order Data:", data);

    const options = {
      key: "rzp_test_SFKfcQi8HPjU4l", // Replace with your Test Key
      amount: data.amount,
      currency: "INR",
      order_id: data.id,
      name: "Furniture Store",
      description: "Order Payment",
      handler: async function (response) {
        await fetch(
          "http://127.0.0.1:8000/api/payments/verify-payment/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          }
        );

        alert("Payment Successful 🎉");
        clearCart();
        navigate("/success");
      },
      prefill: {
        name: "Customer Name",
        email: "customer@email.com",
        contact: "9999999999",
      },
      theme: {
        color: "#7c3aed",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="bg-gray-100 min-h-screen px-20 py-14">

      <div className="grid grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <OrderSummary />
        </div>

        <div className="bg-white p-10 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-8">
            Payment Methods
          </h2>

          <div className="space-y-5">

            <label className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer 
              ${method === "card" ? "border-purple-600 bg-purple-50" : "border-gray-200"}`}>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                />
                <span>Credit / Debit Card</span>
              </div>
              <div className="flex gap-3 text-2xl text-gray-600">
                <FaCcVisa />
                <FaCcMastercard />
              </div>
            </label>

            <label className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer 
              ${method === "upi" ? "border-purple-600 bg-purple-50" : "border-gray-200"}`}>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={method === "upi"}
                  onChange={() => setMethod("upi")}
                />
                <span>UPI Payment</span>
              </div>
              <div className="flex gap-3 text-2xl">
                <FaGooglePay className="text-green-600" />
                <SiPhonepe className="text-purple-600" />
                <SiPaytm className="text-blue-600" />
              </div>
            </label>

            <label className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer 
              ${method === "cod" ? "border-purple-600 bg-purple-50" : "border-gray-200"}`}>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  checked={method === "cod"}
                  onChange={() => setMethod("cod")}
                />
                <span>Cash on Delivery</span>
              </div>
              <span className="text-sm text-gray-500">Pay at doorstep</span>
            </label>
          </div>

          <div className="flex justify-between mt-10">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 border rounded-md hover:bg-gray-100"
            >
              Back
            </button>

            <button
              onClick={handlePayment}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-md font-medium"
            >
              Pay ₹{totalAmount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;