import MainLayout from "../layout/MainLayout";

import Furniture from "../components/Furniture";
import Subscribe from "../components/Subscribe";
import HeroSection from "../components/HeroSection";

function ShopFurniture() {
  return (
    <MainLayout>
      {/* HERO SECTION */}
      <HeroSection
      hero={{
    title:"Furnitures",
    subtitle:"Professional services tailored for your needs",
    background_image: "/images/shop-banner.png",
    button1_text: "Contact Us",
    button2_text: "Our Services",
  }}
  
/>
      <Furniture />
      <Subscribe />
    </MainLayout>
  );
}

export default ShopFurniture;