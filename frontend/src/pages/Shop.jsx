import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";
import HomeCategorySection from "../components/HomeCategorySection";


function Shop() {
  const { categorySlug } = useParams();

  // Product & Loading State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState("");
  const [material, setMaterial] = useState("");
  const [colour, setColour] = useState("");

  // Categories (to find selected category name)
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    api.get("categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch products whenever filters or category change
  useEffect(() => {
    setLoading(true);

    const params = [];

    if (categorySlug) params.push(`category=${categorySlug}`);
    if (searchTerm) params.push(`search=${searchTerm}`);
    if (price) params.push(`price=${price}`);
    if (material) params.push(`material=${material}`);
    if (colour) params.push(`colour=${colour}`);

    let url = "products/";
    if (params.length > 0) url += "?" + params.join("&");

    api.get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [categorySlug, searchTerm, price, material, colour]);

  // Determine selected category/subcategory name
  const selectedCategoryName = (() => {
    if (!categorySlug) return "All Products";

    // Check main categories
    let mainCat = categories.find((c) => c.slug === categorySlug);
    if (mainCat) return mainCat.name;

    // Check subcategories
    for (let c of categories) {
      let sub = c.subcategories.find((s) => s.slug === categorySlug);
      if (sub) return sub.name;
    }

    return "Products";
  })();

  return (
    <MainLayout>
      {/* HERO SECTION */}
      <div className="bg-gray-200 px-20 py-10">
        <HeroSection
          hero={{
            title: "Shop Our Collection",
            subtitle: "Discover timeless designs crafted to elevate your living spaces.",
            background_image: "/images/shop-banner.png",
            button1_text: "Explore Products",
            button2_text: "View Categories",
          }}
        />

        {/* Category Tabs */}
        <HomeCategorySection />

        {/* Title + Search + Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-6">
          {/* Left Side */}
          <div className="flex items-center gap-6 w-full md:w-auto">
            <h1 className="text-4xl font-bold text-gray-800">
              {selectedCategoryName}
            </h1>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 w-64 border border-orange-400 rounded-full focus:outline-none"
              />
              <span className="absolute right-3 top-2.5 text-orange-500">🔍</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-700">FILTERS</span>

            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm"
            >
              <option value="">Price</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>

            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm"
            >
              <option value="">Material</option>
              <option value="cotton">Cotton</option>
              <option value="wool">Wool</option>
            </select>

            <select
              value={colour}
              onChange={(e) => setColour(e.target.value)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm"
            >
              <option value="">Colour</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-400"></div>

      {/* Product Grid */}
      <div className="bg-gray-100 px-20 py-16 min-h-screen">
        {loading ? (
          <div className="text-center text-xl">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-xl">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Shop;