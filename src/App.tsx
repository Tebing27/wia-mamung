import { useState, useRef, useEffect } from "react";
import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LocationSection from "./components/LocationSection";
import { Navbar } from "./components/Navbar";
import UmkmCatalog from "./components/UmkmCatalog";
import UmkmDetail from "./components/UmkmDetail";

type Page = "home" | "catalog" | "detail";

function App() {
  // Initialize page & selected UMKM from URL hash to avoid flash-to-home on refresh
  const parseHash = () => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '';
    if (!hash) return { page: 'home' as Page, id: null as number | null };

    // detail-<id>
    if (hash.startsWith('detail-')) {
      const id = parseInt(hash.split('-')[1] || '', 10);
      return { page: 'detail' as Page, id: Number.isFinite(id) ? id : null };
    }

    if (hash === 'catalog') return { page: 'catalog' as Page, id: null };
    if (hash === 'home' || hash === '') return { page: 'home' as Page, id: null };

    // fall back to home
    return { page: 'home' as Page, id: null };
  };

  const initial = parseHash();
  const [currentPage, setCurrentPage] = useState<Page>(initial.page);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedUmkmId, setSelectedUmkmId] = useState<number | null>(initial.id);
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

  // Handle navigate to detail page
  const handleDetailClick = (umkmId: number) => {
    setSelectedUmkmId(umkmId);
    setCurrentPage("detail");
    // persist in url hash so refresh keeps state
    try { window.location.hash = `detail-${umkmId}`; } catch {}
  };

  // Handle back from detail
  const handleBackFromDetail = () => {
    setCurrentPage("catalog");
    try { window.location.hash = `catalog`; } catch {}
  };

  // Handle navigate to catalog
  const handleMulaiJelajah = () => {
    setCurrentPage("catalog");
    try { window.location.hash = `catalog`; } catch {}
  };

  // Handle back from catalog
  const handleBackFromCatalog = () => {
    setCurrentPage("home");
    try { window.location.hash = `home`; } catch {}
  };

  // Handle navigate to section from catalog
  const handleNavigateToSection = (section: string) => {
    setCurrentPage("home");
    try { window.location.hash = `home`; } catch {}
    // Use setTimeout to ensure page is rendered before scrolling
    setTimeout(() => {
      if (section === "beranda") {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const element = document.querySelector(`#${section}`);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 80;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
  };

  // initial state is derived synchronously from URL hash above; no mount-time effect needed

  return (
    <>
      <Navbar 
        onMulaiJelajahClick={handleMulaiJelajah}
        onNavigateToSection={handleNavigateToSection}
      />
      
      {currentPage === "home" ? (
        <>
          <div id="beranda">
            <HeroSection onUmkmClick={handleUmkmClick} onMulaiJelajahClick={handleMulaiJelajah} />
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
      ) : currentPage === "catalog" ? (
        <UmkmCatalog 
          onBack={handleBackFromCatalog} 
          onUmkmClick={handleDetailClick}
          onNavigateToSection={handleNavigateToSection}
        />
      ) : (
        <UmkmDetail 
          umkmId={selectedUmkmId || 0}
          onBack={handleBackFromDetail}
        />
      )}
    </>
  );
}

export default App;
