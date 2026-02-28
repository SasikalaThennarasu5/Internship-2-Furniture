
import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";
import HeroSection from "../components/HeroSection";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialsSection from "../components/TestimonialsSection";
import { getImageUrl } from "../utils/getImageUrl";

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [whyChoose, setWhyChoose] = useState([]);

  useEffect(() => {
    api.get("about/")
      .then((res) => setAboutData(res.data))
      .catch((err) => console.error(err));

    api.get("team-members/")
      .then((res) => setTeam(res.data))
      .catch((err) => console.error(err));

    api.get("testimonials/")
      .then((res) => setTestimonials(res.data))
      .catch((err) => console.error(err));

    api.get("why-choose-us/")
      .then((res) => setWhyChoose(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!aboutData) {
    return (
      <MainLayout>
        <div className="text-center mt-20 text-xl">Loading...</div>
      </MainLayout>
    );
  }

  

  return (
    <MainLayout>
      {/* HERO SECTION */}
      <HeroSection
  hero={{
    title: "About Us",
    subtitle: "Learn more about our craftsmanship and passion.",
    background_image: "/images/shop-banner.png",
    button1_text: "Contact Us",
    button2_text: "Our Services",
  }}
/>

      {/* WHY CHOOSE US */}
      <WhyChooseUs data={whyChoose} />

      {/* TEAM SECTION */}
      <div className="bg-gray-100 px-20 py-20">
  <h2 className="text-4xl font-bold text-center mb-16 underline underline-offset-8">
    Our Team
  </h2>

  <div className="grid grid-cols-4 gap-12">
    {team.map((member) => (
      <div key={member.id}>
        
        {/* IMAGE */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={getImageUrl(member.image)}
            alt={member.name}
            className="w-full h-72 object-cover"
          />
        </div>

        {/* NAME */}
        <h4 className="mt-6 text-xl font-bold">
          {member.name}
        </h4>

        {/* DESIGNATION */}
        <p className="text-sm text-gray-600 font-medium mt-1">
          {member.designation}
        </p>

        {/* DESCRIPTION */}
        <p className="text-gray-600 mt-4 leading-relaxed text-sm">
          {member.description}
        </p>

        {/* LEARN MORE */}
        <button className="mt-4 font-semibold underline hover:text-black transition">
          Learn more
        </button>
      </div>
    ))}
  </div>
</div>

      {/* TESTIMONIALS */}
      <TestimonialsSection data={testimonials} />
    </MainLayout>
  );
}

export default About;