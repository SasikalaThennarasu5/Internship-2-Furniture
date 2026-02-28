import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";
import HeroSection from "../components/HeroSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ServicesSection from "../components/ServicesSection";
import Material from "../components/Material";
import Subscribe from "../components/Subscribe";

function Services() {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    api.get("services/")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));

    api.get("products/")
      .then((res) => setProducts(res.data.slice(0, 3)))
      .catch((err) => console.error(err));

    api.get("testimonials/")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <MainLayout>

      {/* HERO SECTION */}
      <HeroSection
      hero={{
    title:"Our Services",
    subtitle:"Professional services tailored for your needs",
    background_image: "/images/shop-banner.png",
    button1_text: "Contact Us",
    button2_text: "Our Services",
  }}
  
/>

      {/* SERVICES */}
<ServicesSection data={services} />
      
      {/* PRODUCT PREVIEW SECTION */}
      <Material />
      
      {/* TESTIMONIALS */}
      <TestimonialsSection data={testimonials} />
      <Subscribe />

    </MainLayout>
  );
}

export default Services;