import { useState, useRef } from "react";
import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LocationSection from "./components/LocationSection";
import { Navbar } from "./components/Navbar";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUmkmId, setSelectedUmkmId] = useState<number | null>(null);
  const locationSectionRef = useRef<HTMLDivElement>(null);

  // Handle category selection from CategorySection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedUmkmId(null);
    locationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle UMKM selection from HeroSection
  const handleUmkmClick = (umkmId: number) => {
    setSelectedUmkmId(umkmId);
    setSelectedCategory(null);

    requestAnimationFrame(() => {
      if (locationSectionRef.current) {
        const elementPosition = locationSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 80;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  };

  return (
    <>
      <Navbar />
      <div id="beranda">
        <HeroSection onUmkmClick={handleUmkmClick} />
      </div>
      <div id="kategori">
        <CategorySection onCategoryClick={handleCategoryClick} />
      </div>
      <div id="lokasi" ref={locationSectionRef}>
        <LocationSection
          selectedCategory={selectedCategory}
          selectedUmkmId={selectedUmkmId}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
