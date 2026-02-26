import { Link } from "react-router-dom";

function ProductCard({ product }) {

  const image =
    product.images && product.images.length > 0
      ? product.images[0].image
      : "";

  return (
    <Link to={`/product/${product.slug}`}>
      <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer">

        {image && (
          <img
            src={image}
            alt={product.name}
            className="w-full h-52 object-cover rounded-lg"
          />
        )}

        <h3 className="mt-4 text-sm font-semibold text-gray-800">
          {product.name}
        </h3>

        <div className="mt-2 text-sm">
          {product.discount_price ? (
            <div>
              <span className="line-through text-gray-400 mr-2">
                ₹{product.price}
              </span>
              <span className="text-orange-600 font-bold">
                ₹{product.discount_price}
              </span>
            </div>
          ) : (
            <span className="font-bold">₹{product.price}</span>
          )}
        </div>

        <div className="mt-3 bg-orange-500 text-white text-center py-2 rounded-lg text-sm">
          View Product
        </div>

      </div>
    </Link>
  );
}

export default ProductCard;