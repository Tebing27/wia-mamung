// src/components/Navbar.tsx (DIPERBARUI)

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // <-- 1. Impor

// 2. Ubah href menjadi 'to'
const menuLink = [
  { to: "/#beranda", label: "Beranda" },
  { to: "/#kategori", label: "Kategori" },
  { to: "/#lokasi", label: "Lokasi" },
];

export function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate(); // <-- 3. Gunakan hook
  const location = useLocation(); // <-- 3. Gunakan hook

  // 4. Logika klik BARU untuk menangani Link dan Scroll
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    setOpen(false);

    // Cek apakah 'to' memiliki hash (#)
    const hashIndex = to.indexOf("#");

    if (hashIndex === -1) {
      // Jika tidak ada hash (cth: "/katalog")
      navigate(to);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Jika ada hash (cth: "/#kategori" atau "#beranda")
      const path = to.substring(0, hashIndex) || "/"; // Dapatkan path (cth: "/")
      const hash = to.substring(hashIndex); // Dapatkan hash (cth: "#kategori")

      // Jika kita sudah di halaman home, cukup scroll
      if (location.pathname === "/" && path === "/") {
        if (hash === "#beranda") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        const element = document.querySelector(hash);
        if (element) {
          let offset = 80; // default offset
          if (hash === "#lokasi") offset = 15;

          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      } else {
        // Jika kita di halaman lain (cth: /katalog)
        // Navigasi ke home DENGAN hash (cth: /#lokasi)
        // Ini akan ditangkap oleh useEffect di HomePage.tsx
        navigate(to);
      }
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative flex w-full items-center justify-between h-16">
          {/* 5. Ganti <a> dengan <Link> */}
          <Link
            to="/#beranda"
            onClick={(e) => handleClick(e, "/#beranda")}
            className="shrink-0 inline-flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-[#0B4EA2] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Mamung</span>
          </Link>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {menuLink.map((link) => (
              <Link // 5. Ganti <a> dengan <Link>
                key={link.label}
                to={link.to} // Ganti href
                onClick={(e) => handleClick(e, link.to)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Get Started Button (Desktop) */}
          <div className="hidden md:flex shrink-0 items-center">
            {/* 6. UBAH INI: "Mulai Jelajah" sekarang ke /katalog */}
            <Link
              to="/katalog" // <-- Ganti dari #lokasi
              onClick={(e) => handleClick(e, "/katalog")}
              className="px-5 py-2 bg-[#FFC107] text-black text-sm font-medium rounded-lg  transition-colors"
            >
              Mulai Jelajah
            </Link>
          </div>

          {/* Mobile Menu Toggle (Biarkan) */}
          <div className="md:hidden items-center">
            <button
              onClick={() => setOpen(!isOpen)}
              className="inline-flex p-2 rounded-md text-slate-800"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          <div
            className={`md:hidden absolute top-full rounded-b-lg left-0 w-full bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ${
              isOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-4"
            }`}
          >
            <div className="p-4 space-y-3">
              {menuLink.map((link) => (
                <Link // 5. Ganti <a> dengan <Link>
                  key={link.label}
                  to={link.to} // Ganti href
                  onClick={(e) => handleClick(e, link.to)}
                  className="block px-3 py-2 rounded-mdtext-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
              {/* 6. UBAH INI: "Mulai Jelajah" sekarang ke /katalog */}
              <Link
                to="/katalog" // <-- Ganti dari #lokasi
                onClick={(e) => handleClick(e, "/katalog")}
                className="block w-full px-5 py-2 bg-[#FFC107] text-black text-sm font-medium rounded-lg hover:bg-[#f5bc13]transition-colors text-center"
              >
                Mulai Jelajah
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
