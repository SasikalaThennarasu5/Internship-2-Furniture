import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({});

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`products/${slug}/`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.images?.[0]?.image);

        // Fetch related products (same category)
        if (res.data.category?.slug) {
          api.get(`products/?category=${res.data.category.slug}`)
            .then((relatedRes) => {
              const filtered = relatedRes.data.filter(
                (item) => item.slug !== res.data.slug
              );
              setRelatedProducts(filtered.slice(0, 4));
            });
        }
      })
      .catch((err) => console.error(err));
  }, [slug]);

  if (!product) return <p className="p-20">Loading...</p>;

  // Zoom Effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= PRODUCT SECTION ================= */}
      <div className="px-20 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* LEFT SIDE - IMAGE + ZOOM */}
        <div>
          <div
            className="overflow-hidden rounded-xl border shadow-sm cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={selectedImage}
              alt={product.name}
              style={zoomStyle}
              className="w-full h-[500px] object-cover transition-transform duration-200"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-4">
            {product.images?.map((img) => (
              <img
                key={img.id}
                src={img.image}
                alt=""
                onClick={() => setSelectedImage(img.image)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                  selectedImage === img.image
                    ? "border-black"
                    : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - INFO */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {product.name}
          </h1>

          <p className="text-3xl text-orange-600 font-semibold mb-6">
            ₹ {product.price}
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Meta Info */}
          <div className="space-y-2 mb-6 text-sm text-gray-700">
            <p><span className="font-semibold">Material:</span> {product.material}</p>
            <p><span className="font-semibold">Colour:</span> {product.colour}</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-8">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="px-4 py-2 text-lg"
              >
                -
              </button>
              <span className="px-6">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => {
              addToCart({ ...product, quantity });
              navigate("/cart");
            }}
            className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-lg text-lg transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* ================= RELATED PRODUCTS ================= */}
      {relatedProducts.length > 0 && (
        <div className="px-20 pb-20">
          <h2 className="text-2xl font-semibold mb-10">
            Related Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetail;