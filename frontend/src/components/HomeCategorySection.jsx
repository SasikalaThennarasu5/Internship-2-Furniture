import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function HomeCategorySection() {
  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    API.get("categories/")
  .then((res) => {
    const list = Array.isArray(res.data) ? res.data : res.data.results || [];
    setCategories(list);
  })
  .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gray-100 py-16 px-20 relative">
      
      {/* Title */}
      <h2 className="text-2xl font-semibold underline underline-offset-8 mb-10">
        Home Styling
      </h2>

      {/* Category Tabs */}
      <div className="flex justify-between items-center border-b pb-4">
        {categories.map((category) => (
  <div key={category.id} className="relative group">
    
    <button className="text-gray-700 font-medium hover:text-black transition">
      {category.name}
    </button>

            {/* Dropdown */}
            {category.subcategories.length > 0 && (
              <div className="absolute top-8 left-0 hidden group-hover:block bg-white shadow-xl rounded-lg p-6 w-64 z-50 border">
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
))}      </div>

    </div>
  );
}

export default HomeCategorySection;