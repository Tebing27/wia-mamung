// src/App.tsx

import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

import HomePage from "./pages/HomePage";
import KatalogPage from "./pages/KatalogPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <>
      <Navbar />

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
