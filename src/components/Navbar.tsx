import { useState } from "react";
import { Menu, X } from "lucide-react";

const menuLink = [
  { href: "#beranda", label: "Beranda" },
  { href: "#kategori", label: "Kategori" },
  { href: "#lokasi", label: "Lokasi" },
];

interface NavbarProps {
  onMulaiJelajahClick?: () => void;
  onNavigateToSection?: (section: string) => void;
}

export function Navbar({ onMulaiJelajahClick, onNavigateToSection }: NavbarProps) {
  const [isOpen, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    
    if (href === "#beranda") {
      // Jika onNavigateToSection ada (saat di halaman catalog), gunakan itu untuk navigate ke beranda
      if (onNavigateToSection) {
        onNavigateToSection("beranda");
      } else {
        // Jika di halaman home, langsung scroll ke top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (href === "#kategori" || href === "#lokasi") {
      // Jika onNavigateToSection ada (saat di halaman catalog), gunakan itu
      if (onNavigateToSection) {
        onNavigateToSection(href.substring(1)); // Remove # dari href
      } else {
        // Jika di halaman home, gunakan scroll biasa
        const element = document.querySelector(href);
        if (element) {
          let offset = 80;
          if (href === "#lokasi") {
            offset = 15;
          }
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative flex w-full items-center justify-between h-16">
          {/* Logo */}
          <a 
            href="#beranda" 
            onClick={(e) => handleClick(e, "#beranda")}
            className="shrink-0 inline-flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-[#0B4EA2] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-slate-900">
              Mamung
            </span>
          </a>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {menuLink.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Get Started Button (Desktop) */}
          <div className="hidden md:flex shrink-0 items-center">
            <button
              onClick={onMulaiJelajahClick}
              className="px-5 py-2 bg-[#FFC107] text-black text-sm font-medium rounded-lg  transition-colors hover:bg-[#FFB800]"
            >
              Mulai Jelajah
            </button>
          </div>

          {/* Mobile Menu Toggle */}
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
            className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ${
              isOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-4"
            }`}
          >
            <div className="p-4 space-y-3">
              {menuLink.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onMulaiJelajahClick?.();
                }}
                className="block w-full px-5 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
              >
                Mulai Jelajah
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
