import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LocationSection from "../components/LocationSection";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUmkmId, setSelectedUmkmId] = useState<number | null>(null);

  // Ref untuk scroll ke LocationSection
  const locationSectionRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  // Handle scroll untuk hash URL manual (/#lokasi atau /#kategori)
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offset = 80; // 80px offset untuk header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [location.hash]);

  // Handler ketika category di-klik dari CategorySection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedUmkmId(null); // Reset selected UMKM

    // Scroll ke LocationSection
    scrollToLocationSection();
  };

  // Handler ketika "Lihat Lokasi" di-klik dari HeroSection
  const handleUmkmClick = (umkmId: number) => {
    setSelectedUmkmId(umkmId); // Set UMKM yang dipilih
    setSelectedCategory(null); // Reset category filter

    // Scroll ke LocationSection
    scrollToLocationSection();
  };

  // Fungsi helper untuk scroll (DRY principle)
  const scrollToLocationSection = () => {
    if (locationSectionRef.current) {
      const elementPosition =
        locationSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80; // 80px offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
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
