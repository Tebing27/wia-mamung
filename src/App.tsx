// src/App.tsx (BARU, JAUH LEBIH SEDERHANA)

import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

// Impor 3 halaman baru yang kita buat
import HomePage from "./pages/HomePage";
import KatalogPage from "./pages/KatalogPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <>
      {/* Navbar selalu tampil di semua halaman */}
      <Navbar />

      {/* Routes mendefinisikan halaman mana yang tampil berdasarkan URL */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/katalog" element={<KatalogPage />} />
        <Route path="/detail/:umkmId" element={<DetailPage />} />

        {/* Jika URL tidak ditemukan, kembali ke Home */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
