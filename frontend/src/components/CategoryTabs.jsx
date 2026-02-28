import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function CategoryTabs() {
  const [categories, setCategories] = useState([]);
  const { categorySlug } = useParams();

  useEffect(() => {
    api.get("categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 py-6 border-b bg-white">
      {/* All Products Tab */}
      <Link
        to="/shop"
        className={`text-sm font-medium ${
          !categorySlug
            ? "text-orange-600 border-b-2 border-orange-600 pb-2"
            : "text-gray-600 hover:text-orange-600"
        }`}
      >
        All
      </Link>

      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/shop/${category.slug}`}
          className={`text-sm font-medium ${
            categorySlug === category.slug
              ? "text-orange-600 border-b-2 border-orange-600 pb-2"
              : "text-gray-600 hover:text-orange-600"
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

export default CategoryTabs;