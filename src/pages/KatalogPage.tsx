// src/pages/KatalogPage.tsx (File BARU)
import { useNavigate } from "react-router-dom";
import UmkmCatalog from "../components/UmkmCatalog";

export default function KatalogPage() {
  const navigate = useNavigate();

  // Navigasi ke halaman detail
  const handleDetailClick = (umkmId: number) => {
    navigate(`/detail/${umkmId}`);
  };

  // Navigasi kembali ke Home
  const handleBackFromCatalog = () => {
    navigate("/");
  };

  // Navigasi ke Home dan scroll ke section
  const handleNavigateToSection = (section: string) => {
    navigate(`/#${section}`); // cth: /#kategori
  };

  return (
    <UmkmCatalog
      onBack={handleBackFromCatalog}
      onUmkmClick={handleDetailClick}
      onNavigateToSection={handleNavigateToSection}
    />
  );
}
