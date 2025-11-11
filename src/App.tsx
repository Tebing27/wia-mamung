import { useState, useRef } from "react";
import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LocationSection from "./components/LocationSection";
import { Navbar } from "./components/Navbar";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const locationSectionRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Scroll to location section
    locationSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <HeroSection />
      <CategorySection onCategoryClick={handleCategoryClick} />
      <div ref={locationSectionRef}>
        <LocationSection selectedCategory={selectedCategory} />
      </div>
      <Footer />
    </>
  );
}

export default App;
