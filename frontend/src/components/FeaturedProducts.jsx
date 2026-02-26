import { Link } from "react-router-dom";

function FeaturedProducts({ products }) {
  return (
    <div className="px-20 py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Featured Products
      </h2>

      <div className="grid grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg hover:shadow-lg transition"
          >
            {product.images.length > 0 && (
              <img
                src={product.images[0].image}
                alt={product.name}
                className="w-full h-60 object-cover rounded"
              />
            )}

            <h3 className="mt-4 font-semibold text-lg">
              {product.name}
            </h3>

            <div className="mt-2">
              {product.discount_price ? (
                <div>
                  <span className="line-through text-gray-400 mr-2">
                    ₹{product.price}
                  </span>
                  <span className="text-red-600 font-bold">
                    ₹{product.discount_price}
                  </span>
                </div>
              ) : (
                <span className="font-bold">₹{product.price}</span>
              )}
            </div>

            <Link
              to={`/product/${product.slug}`}
              className="block mt-4 bg-black text-white text-center py-2 rounded"
            >
              View Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;