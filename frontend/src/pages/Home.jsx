
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
<div className="px-20 py-24 bg-gray-100">

  {/* Header Row */}
  <div className="flex justify-between items-center mb-12">
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

  {/* Blog Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
    {blogs.map((blog) => (
      <Link
        key={blog.id}
        to={`/blog/${blog.slug}`}
        className="group block"
      >
        {/* Image */}
        <img
          src={getImageUrl(blog.thumbnail)}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-2xl mb-6 group-hover:scale-105 transition duration-300"
        />

        {/* Title */}
        <h3 className="font-semibold text-lg mb-2">
          {blog.title}
        </h3>

        {/* Author + Date */}
        <p className="text-sm text-gray-500">
          by {blog.author_name} on{" "}
          {new Date(blog.created_at).toLocaleDateString()}
        </p>
      </Link>
    ))}
  </div>

</div>
        </div>
        
        
      )}
      <Subscribe />
    </MainLayout>
  );
}

export default Home;
