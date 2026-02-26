import { useCart } from "../context/CartContext";

function OrderSummary() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;
  const shipping = 0;
  const total = subtotal + tax + shipping;

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm">

      {/* CART ITEMS */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between mb-6"
        >
          {/* IMAGE */}
          <img
            src={item.images?.[0]?.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />

          {/* NAME + QTY */}
          <div className="flex-1 ml-4">
            <h3 className="font-medium">{item.name}</h3>

            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-2 border"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => increaseQty(item.id)}
                className="px-2 border"
              >
                +
              </button>
            </div>
          </div>

          {/* PRICE */}
          <div className="text-right">
            ₹ {item.price}
            <button
              onClick={() => removeFromCart(item.id)}
              className="block text-gray-400 mt-2"
            >
              🗑
            </button>
          </div>
        </div>
      ))}

      <hr className="my-6" />

      {/* SUMMARY */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹ {subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Sales tax (5%)</span>
          <span>₹ {tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="text-green-600">FREE</span>
        </div>

        <div className="flex justify-between font-semibold text-blue-600 pt-3">
          <span>Total due</span>
          <span>₹ {total.toFixed(2)}</span>
        </div>
      </div>

    </div>
  );
}

export default OrderSummary;