import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Material() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const products = [
    {
      id: 1,
      name: "Nordic Chair",
      price: 50,
      image: "/images/chair1.png",
    },
    {
      id: 2,
      name: "Nordic Chair",
      price: 45,
      image: "/images/chair2.png",
    },
    {
      id: 3,
      name: "Nordic Chair",
      price: 35,
      image: "/images/chair3.png",
    },
  ];

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    setCartCount(cart.length);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="bg-gray-100 px-20 py-16 relative">
      <div className="grid grid-cols-4 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Crafted with excellent material.
          </h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Ut elit tellus, luctus nec ullamcorper mattis.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="bg-gray-600 text-white px-6 py-3 rounded-full hover:bg-black transition"
          >
            Explore
          </button>
        </div>

        {/* PRODUCTS */}
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group text-center"
          >
            <div className="bg-white p-6 rounded-xl transition group-hover:shadow-xl">
              <img
                src={product.image}
                alt={product.name}
                className="mx-auto h-56 object-contain"
              />
              <h3 className="mt-4 font-semibold text-lg">
                {product.name}
              </h3>
              <p className="mt-2 font-bold">${product.price}.00</p>
            </div>

            {/* PLUS BUTTON (VISIBLE ON HOVER) */}
            <button
              onClick={() => handleAddToCart(product)}
              className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 
              bg-black text-white w-10 h-10 rounded-full 
              flex items-center justify-center opacity-0 
              group-hover:opacity-100 transition"
            >
              +
            </button>
          </div>
        ))}
      </div>

      {/* TOAST MESSAGE */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 
        bg-green-600 text-white px-8 py-4 rounded-lg 
        flex items-center justify-between w-[500px] shadow-lg">

          <span>{cartCount} Item added</span>

          <button
            onClick={() => navigate("/cart")}
            className="font-semibold"
          >
            VIEW CART 🛒
          </button>
        </div>
      )}
    </div>
  );
}

export default Material;