import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function CategoryTabs() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const { categorySlug } = useParams();
  const dropdownRef = useRef(null);

  useEffect(() => {
    api.get("categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white border-b py-4" ref={dropdownRef}>
      <div className="flex flex-wrap justify-center gap-6">

        {/* ALL PRODUCTS */}
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

        {/* CATEGORIES */}
        {categories.map((category) => (
          <div key={category.id} className="relative">

            <button
              onClick={() =>
                setActiveCategory(
                  activeCategory === category.id ? null : category.id
                )
              }
              className={`text-sm font-medium ${
                categorySlug === category.slug
                  ? "text-orange-600 border-b-2 border-orange-600 pb-2"
                  : "text-gray-600 hover:text-orange-600"
              }`}
            >
              {category.name}
            </button>

            {/* SUBCATEGORIES */}
            {activeCategory === category.id && category.subcategories && (
              <div className="absolute top-8 left-0 bg-white shadow-lg border rounded p-4 w-48 z-50">

                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    to={`/shop/${category.slug}/${sub.slug}`}
                    className="block py-1 text-sm text-gray-600 hover:text-orange-600"
                    onClick={() => setActiveCategory(null)}
                  >
                    {sub.name}
                  </Link>
                ))}

              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryTabs;