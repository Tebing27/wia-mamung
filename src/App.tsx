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

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedUmkmId(null); // Reset UMKM selection
    // Scroll to location section
    locationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUmkmClick = (umkmId: number) => {
    setSelectedUmkmId(umkmId);
    setSelectedCategory(null);

    // Scroll to location section with custom offset
    requestAnimationFrame(() => {
      if (locationSectionRef.current) {
        const elementPosition = locationSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - -160; // Adjust offset value as needed

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
