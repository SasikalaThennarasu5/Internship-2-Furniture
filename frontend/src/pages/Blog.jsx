import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import API from "../services/api";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Subscribe from "../components/Subscribe";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    API.get("blogs/")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));

    API.get("testimonials/")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <MainLayout>

      {/* HERO SECTION */}
      <HeroSection
      hero={{
    title: "Our Blog",
    subtitle: "Latest trends and updates",
    background_image: "/images/shop-banner.png",
    button1_text: "Contact Us",
    button2_text: "Our Services",
  }}
  
/>

      {/* BLOG GRID */}
      <div className="px-20 py-16">
        <div className="grid grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              
              <img
  src={getImageUrl(blog.thumbnail)}
  alt={blog.title}
  className="w-full h-56 object-cover"
/>

              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {blog.title}
                </h3>

                <p className="text-gray-600 text-sm mt-2">
                  {blog.excerpt}
                </p>

                <p className="text-xs text-gray-400 mt-3">
                  {new Date(blog.created_at).toDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection data={testimonials} />
      <Subscribe />

    </MainLayout>
  );
}

export default Blog;