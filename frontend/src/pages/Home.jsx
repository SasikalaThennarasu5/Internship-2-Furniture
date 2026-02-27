import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import API from "../services/api";
import { Link } from "react-router-dom";
import HomeCategorySection from "../components/HomeCategorySection";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialsSection from "../components/TestimonialsSection";
import ServicesSection from "../components/ServicesSection";
import HeroSection from "../components/HeroSection";
import Material from "../components/Material";
import Subscribe from "../components/Subscribe";
import { getImageUrl } from "../utils/getImageUrl";

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [whyChoose, setWhyChoose] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const [loadingHome, setLoadingHome] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // HOME DATA
        const homeRes = await API.get("home/");
        setHomeData(homeRes.data);

        // FEATURED PRODUCTS
        const productsRes = await API.get("products/?featured=true");
        setFeaturedProducts(Array.isArray(productsRes.data) ? productsRes.data : productsRes.data.results || []);

        // SERVICES
        const servicesRes = await API.get("services/");
        setServices(Array.isArray(servicesRes.data) ? servicesRes.data : servicesRes.data.results || []);

        // TESTIMONIALS
        const testimonialsRes = await API.get("testimonials/");
        setTestimonials(Array.isArray(testimonialsRes.data) ? testimonialsRes.data : testimonialsRes.data.results || []);

        // WHY CHOOSE US
        const whyRes = await API.get("why-choose-us/");
        setWhyChoose(Array.isArray(whyRes.data) ? whyRes.data : whyRes.data.results || []);

        // BLOGS
        const blogsRes = await API.get("blogs/");
        const blogList = Array.isArray(blogsRes.data) ? blogsRes.data : blogsRes.data.results || [];
        setBlogs(blogList.slice(0, 3));

      } catch (error) {
        console.error("Error fetching Home data:", error);
      } finally {
        setLoadingHome(false);
      }
    };

    fetchData();
  }, []);

  if (loadingHome) {
    return (
      <MainLayout>
        <div className="text-center mt-20 text-xl">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* HERO SECTION */}
      {homeData?.hero && <HeroSection hero={homeData.hero} />}

      {/* CATEGORY SECTION */}
      <HomeCategorySection />

      {/* FEATURED PRODUCTS */}
      {featuredProducts.length > 0 && <Material products={featuredProducts} />}

      {/* WHY CHOOSE US */}
      {whyChoose.length > 0 && <WhyChooseUs data={whyChoose} />}

      {/* SERVICES */}
      {services.length > 0 && <ServicesSection data={services} />}

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && <TestimonialsSection data={testimonials} />}

      {/* RECENT BLOGS */}
      {blogs.length > 0 && (
        <div className="px-20 py-24 bg-gray-100">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Recent Blog</h2>
            <Link
              to="/blogs"
              className="text-sm font-medium underline hover:text-gray-600 transition"
            >
              View All Posts
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="group block"
              >
                <img
                  src={getImageUrl(blog.thumbnail)}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-2xl mb-6 group-hover:scale-105 transition duration-300"
                />
                <h3 className="font-semibold text-lg mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-500">
                  by {blog.author_name} on {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Subscribe />
    </MainLayout>
  );
}

export default Home;