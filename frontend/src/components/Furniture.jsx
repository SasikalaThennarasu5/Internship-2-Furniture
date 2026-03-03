import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Furniture() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const api_BASE = import.meta.env.VITE_api_BASE_URL;
  console.log("API BASE:", api_BASE);

  useEffect(() => {
    api.get("products/?category=furniture")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart");
  };

  const getImageUrl = (imagePath) => {
  if (!imagePath) return "";

  // If already full URL (Cloudinary etc.)
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // If starts with /media
  if (imagePath.startsWith("/media")) {
    return `${api_BASE}${imagePath}`;
  }

  return `${api_BASE}/${imagePath}`;
};
  

  return (
    <div className="px-20 py-16 bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product) => {
          const imagePath = product.images?.[0]?.image;
          const imageUrl = getImageUrl(imagePath);

          console.log("IMAGE URL:", imageUrl);

          return (
            <div key={product.id} className="relative group text-center">
              <div className="bg-white p-6 rounded-xl group-hover:shadow-xl transition">
                
                {/* PRODUCT IMAGE */}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="mx-auto h-52 object-contain"
                  />
                )}

                <h3 className="mt-4 font-semibold">
                  {product.name}
                </h3>

                <p className="mt-2 font-bold">
                  ${product.discount_price || product.price}
                </p>
              </div>

              {/* ADD BUTTON */}
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
          );
        })}
      </div>
    </div>
  );
}

export default Furniture;