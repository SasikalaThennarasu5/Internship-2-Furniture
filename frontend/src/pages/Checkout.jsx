import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Checkout() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const subtotal = cartItems.reduce(
  (sum, item) => sum + Number(item.price) * item.quantity,
  0
);

  const tax = subtotal * 0.065;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (cartItems.length === 0)
    return <div className="p-20">Your cart is empty</div>;

  return (
    <div className="bg-gray-100 min-h-screen px-10 py-12">

      {/* PROGRESS STEPS */}
      <div className="flex justify-center gap-8 mb-12 text-gray-500">
        <span className="text-purple-600 font-semibold">
          Shipping
        </span>
        <span>Delivery</span>
        <span>Payment</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

        {/* ================= LEFT - ORDER SUMMARY ================= */}
        <div className="bg-white p-8 rounded-xl shadow-sm">

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images?.[0]?.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 border rounded"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ${Number(item.price).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 text-sm mt-2"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}

          {/* COUPON */}
          <div className="flex gap-4 mt-8">
            <input
              type="text"
              placeholder="Gift Card / Discount code"
              className="border p-2 flex-1 rounded"
            />
            <button className="border px-4 py-2 rounded text-purple-600 border-purple-600">
              Apply
            </button>
          </div>

          {/* TOTALS */}
<div className="mt-8 text-sm">
  <div className="flex justify-between mb-2">
    <span>Subtotal</span>
    <span>${subtotal.toFixed(2)}</span>
  </div>

  <div className="flex justify-between mb-2">
    <span>Sales tax (6.5%)</span>
    <span>${tax.toFixed(2)}</span>
  </div>

  <div className="flex justify-between mb-2">
    <span>Shipping Fee</span>
    <span className="text-green-600">FREE</span>
  </div>

  <div className="flex justify-between font-semibold text-lg mt-4">
    <span>Total due</span>
    <span className="text-purple-600">
      ${total.toFixed(2)}
    </span>
  </div>
</div>
        </div>

        {/* ================= RIGHT - FORM ================= */}
        <div className="space-y-8">

          {/* CONTACT CARD */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-6">Contact Details</h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="border p-3 rounded"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="border p-3 rounded"
              />
            </div>

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border p-3 rounded w-full mb-6"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="border p-3 rounded w-full"
            />
          </div>

          {/* SHIPPING CARD */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-6">Shipping Details</h2>

            <input
              name="address"
              placeholder="Flat/House no."
              onChange={handleChange}
              className="border p-3 rounded w-full mb-6"
            />

            <input
              name="street"
              placeholder="Address"
              onChange={handleChange}
              className="border p-3 rounded w-full mb-6"
            />

            <div className="grid grid-cols-2 gap-6 mb-6">
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="border p-3 rounded"
              />
              <input
                name="state"
                placeholder="State"
                onChange={handleChange}
                className="border p-3 rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <input
                name="postalCode"
                placeholder="Postal Code"
                onChange={handleChange}
                className="border p-3 rounded"
              />
              <input
                name="landmark"
                placeholder="Famous Landmark"
                onChange={handleChange}
                className="border p-3 rounded"
              />
            </div>

            <div className="flex items-center gap-2 mb-6 text-sm">
              <input type="checkbox" />
              <span>
                My shipping and Billing address are the same
              </span>
            </div>

            <button
              onClick={() => navigate("/delivery")}
              className="bg-purple-600 text-white px-8 py-3 rounded-md float-right"
            >
              Continue
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;