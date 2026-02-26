import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OrderSummary from "../components/OrderSummary";

function Delivery() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("standard");

  return (
    <div className="bg-gray-100 min-h-screen px-10 py-12">

      {/* PROGRESS STEPS */}
      <div className="flex justify-center gap-8 mb-12 text-gray-500">
        <span>Shipping</span>
        <span className="text-purple-600 font-semibold border-b-2 border-purple-600 pb-1">
          Delivery
        </span>
        <span>Payment</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

        {/* LEFT - ORDER SUMMARY */}
        <div className="bg-white p-8 rounded-xl shadow-sm h-fit sticky top-24">
          <OrderSummary />
        </div>

        {/* RIGHT - DELIVERY OPTIONS */}
        <div className="bg-white p-10 rounded-xl shadow-sm">

          <h2 className="text-2xl font-semibold mb-8">
            Choose Delivery Method
          </h2>

          <div className="space-y-6">

            {/* STANDARD */}
            <label
              className={`flex justify-between items-center border p-6 rounded-lg cursor-pointer transition ${
                method === "standard"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  checked={method === "standard"}
                  onChange={() => setMethod("standard")}
                  className="accent-purple-600"
                />
                <div className="ml-4">
                  <p className="font-medium">
                    Standard Delivery
                  </p>
                  <p className="text-sm text-gray-500">
                    3–5 Business Days
                  </p>
                </div>
              </div>

              <span className="font-semibold text-green-600">
                FREE
              </span>
            </label>

            {/* EXPRESS */}
            <label
              className={`flex justify-between items-center border p-6 rounded-lg cursor-pointer transition ${
                method === "express"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  checked={method === "express"}
                  onChange={() => setMethod("express")}
                  className="accent-purple-600"
                />
                <div className="ml-4">
                  <p className="font-medium">
                    Express Delivery
                  </p>
                  <p className="text-sm text-gray-500">
                    1–2 Business Days
                  </p>
                </div>
              </div>

              <span className="font-semibold">
                ₹ 199
              </span>
            </label>

          </div>

          <button
            onClick={() => navigate("/payment")}
            className="mt-12 w-full bg-purple-600 text-white py-4 rounded-lg hover:bg-purple-700 transition text-lg"
          >
            Continue to Payment
          </button>

        </div>

      </div>

    </div>
  );
}

export default Delivery;