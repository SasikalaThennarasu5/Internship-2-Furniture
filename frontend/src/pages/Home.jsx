
import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";
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

const blogImages = [
    "/images/blog/blog1.png",
    "/images/blog/blog2.png",
    "/images/blog/blog3.png",
    "/images/blog/blog4.png",
    "/images/blog/blog5.png",
  ];

  useEffect(() => {
    api.get("home/")
      .then((res) => {
        setHomeData(res.data);
      })
      .catch((err) => console.error(err));

    api.get("products/?featured=true")
      .then((res) => {
        setFeaturedProducts(res.data);
      })
      .catch((err) => console.error(err));
  

     api.get("services/")
  .then((res) => setServices(res.data))
  .catch((err) => console.error(err));

api.get("testimonials/")
  .then((res) => setTestimonials(res.data))
  .catch((err) => console.error(err));


api.get("why-choose-us/")
  .then((res) => setWhyChoose(res.data))
  .catch((err) => console.error(err));

api.get("blogs/")
  .then((res) => setBlogs(res.data.slice(0, 3)))
  .catch((err) => console.error(err));
}, []);



  return (
    <MainLayout>
      {!homeData ? (
        <div className="text-center mt-20 text-xl">Loading...</div>
      ) : (
        <div>
          {/* HERO SECTION */}
          <HeroSection hero={homeData?.hero} />
          
          
<HomeCategorySection />

          {/* FEATURED PRODUCTS */}
         <Material />

          {/* WHY CHOOSE US */}
<WhyChooseUs data={whyChoose} />

{/* SERVICES */}
<ServicesSection data={services} />

{/* TESTIMONIALS */}
<TestimonialsSection data={testimonials} />

{/* RECENT BLOGS */}


{/* Header Row */}
<div className="flex justify-between items-center mb-12 mt-16">
  <h2 className="text-4xl font-bold">
    Recent Blog
  </h2>

  <Link
    to="/blogs"
    className="text-sm font-medium underline hover:text-gray-600 transition"
  >
    View All Posts
  </Link>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {blogs.map((blog, index) => (
    <Link
      key={blog.id}
      to={`/blog/${blog.slug}`}
      className="border rounded-lg overflow-hidden hover:shadow-lg transition"
    >

      <img
        src={blogImages[index % blogImages.length]}
        alt={blog.title}
        onError={(e) => {
          e.target.src = "/images/blog/blog1.png";
        }}
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
        
        
      )}
      <Subscribe />
    </MainLayout>
  );
}

export default Home;
