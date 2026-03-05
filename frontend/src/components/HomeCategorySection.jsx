import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function HomeCategorySection() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // NEW

  useEffect(() => {
    api.get("categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCategoryClick = (id) => {
    // Toggle open/close
    setActiveCategory(activeCategory === id ? null : id);
  };

  return (
    <div className="bg-gray-100 py-16 px-20 relative">
      
      {/* Title */}
      <h2 className="text-2xl font-semibold underline underline-offset-8 mb-10">
        Home Styling
      </h2>

      {/* Category Tabs */}
      <div className="flex justify-between items-center border-b pb-4">
        {categories.map((category) => (
          <div key={category.id} className="relative">
            
            <button
              onClick={() => handleCategoryClick(category.id)}
              className="text-gray-700 font-medium hover:text-black transition"
            >
              {category.name}
            </button>

            {/* Dropdown */}
            {category.subcategories.length > 0 &&
              activeCategory === category.id && (
                <div className="absolute top-8 left-0 bg-white shadow-xl rounded-lg p-6 w-64 z-50 border">
                  {category.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/shop/${sub.slug}`}
                      className="block py-2 text-gray-600 hover:text-black hover:translate-x-1 transition-all duration-200"
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

export default HomeCategorySection;