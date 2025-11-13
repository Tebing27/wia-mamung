import { useState } from "react";
import { Menu, X } from "lucide-react";

const menuLink = [
  { href: "#beranda", label: "Beranda" },
  { href: "#kategori", label: "Kategori" },
  { href: "#lokasi", label: "Lokasi" },
];

export function Navbar() {
  const [isOpen, setOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    
    if (href === "#beranda") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80; // Offset for fixed navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header className="w-full p-4 bg-[#0B4EA2] sticky top-0 z-50">
      <div className="mx-auto max-w-7xl">
        <nav className="relative flex w-full items-center justify-between rounded-xl bg-white p-4 shadow-md md:rounded-2xl">
          {/* Logo */}
          <a 
            href="#beranda" 
            onClick={(e) => handleClick(e, "#beranda")}
            className="shrink-0 inline-flex items-center gap-4"
          >
            <span className="text-2xl md:text-3xl font-bold text-slate-900">
              Mamung
            </span>
          </a>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
            {menuLink.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-base font-medium text-black transition-colors hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
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
            className={`md:hidden absolute top-full left-0 w-full mt-2 transition-all duration-300 ${
              isOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-4"
            }`}
          >
            <div className="rounded-lg bg-white shadow-lg p-4 space-y-3">
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
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
