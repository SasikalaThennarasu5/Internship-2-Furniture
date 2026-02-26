import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= EMPTY CART ================= */
  if (cartItems.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-semibold mb-4">Your Cart is Empty 🛒</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything yet.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HEADER SECTION ================= */}
      {/* HERO SECTION */}
      <div className="bg-gray-200 px-20 py-10">
        <HeroSection
          hero={{
            title: "Shop Our Collection",
            subtitle: "Discover timeless designs crafted to elevate your living spaces.",
            background_image: "/images/shop-banner.png",
            button1_text: "Explore Products",
            button2_text: "View Categories",
          }}
        />
      
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT SIDE - ITEMS */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8">

          <h2 className="text-2xl font-semibold mb-8">
            Cart Items ({cartItems.length})
          </h2>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-6"
            >
              {/* Product Info */}
              <div className="flex items-center gap-6">
                <img
                  src={item.images?.[0]?.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    ₹ {item.price}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-4">

                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-6">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <div className="font-semibold w-24 text-right">
                  ₹ {item.price * item.quantity}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  ✕
                </button>

              </div>
            </div>
          ))}

          {/* CONTINUE SHOPPING */}
          <div className="mt-8">
            <button
              onClick={() => navigate("/shop")}
              className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              ← Continue Shopping
            </button>
          </div>

        </div>

        {/* ================= RIGHT SIDE - SUMMARY ================= */}
        <div className="bg-white rounded-xl shadow-md p-8 h-fit">

          <h2 className="text-2xl font-semibold mb-8">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>

          <div className="flex justify-between mb-4 text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-lg mb-8">
            <span>Total</span>
            <span>₹ {subtotal}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-800 transition text-lg"
          >
            Proceed to Checkout
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Secure checkout powered by SSL encryption 🔒
          </p>

        </div>

      </div>

    </div>
  );
}

export default Cart;