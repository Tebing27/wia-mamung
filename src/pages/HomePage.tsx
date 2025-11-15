import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StatisticsSection from "../components/StatisticsSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LocationSection from "../components/LocationSection";

export default function HomePage() {
  const [selectedUmkmId, setSelectedUmkmId] = useState<number | null>(null);

  const locationSectionRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const offset = 80;
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

  // Handler ketika "Lihat Lokasi" di-klik dari HeroSection
  const handleUmkmClick = (umkmId: number) => {
    setSelectedUmkmId(umkmId);

    scrollToLocationSection();
  };

  const scrollToLocationSection = () => {
    if (locationSectionRef.current) {
      const isMobile = window.innerWidth < 768;
      const offset = isMobile ? -605 : -160;

      const elementPosition =
        locationSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

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

      <div id="statistik">
        <StatisticsSection />
      </div>

      <div id="lokasi" ref={locationSectionRef}>
        <LocationSection
          selectedCategory={null}
          selectedUmkmId={selectedUmkmId}
        />
      </div>

      <Footer />
    </>
  );
}
