import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CategorySection from "../components/CategorySection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LocationSection from "../components/LocationSection";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUmkmId, setSelectedUmkmId] = useState<number | null>(null);
  const locationSectionRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Efek untuk scroll ke section jika ada hash (cth: /#kategori)
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          let offset = 80; // default offset
          if (hash === "#lokasi") offset = 15;

          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100); // Beri waktu 100ms agar halaman dirender
    }
  }, [location.hash]); // Jalankan ulang jika hash berubah

  // Handler dari CategorySection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedUmkmId(null);
    locationSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handler dari HeroSection (onUmkmClick)
  const handleUmkmClick = (umkmId: number) => {
    setSelectedUmkmId(umkmId);
    setSelectedCategory(null);

    // Logika scroll ke #lokasi dari App.tsx lama Anda
    requestAnimationFrame(() => {
      if (locationSectionRef.current) {
        const elementPosition =
          locationSectionRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - 80;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  };

  // Handler dari HeroSection (onMulaiJelajahClick)
  const handleMulaiJelajah = () => {
    navigate("/katalog"); // <-- Navigasi ke halaman katalog
  };

  return (
    <>
      <div id="beranda">
        <HeroSection
          onUmkmClick={handleUmkmClick}
          onMulaiJelajahClick={handleMulaiJelajah}
        />
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
