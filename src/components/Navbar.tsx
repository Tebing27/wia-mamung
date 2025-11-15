import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const menuLink = [
  { to: "/#beranda", label: "Beranda" },
  { to: "/#statistik", label: "Statistik" },
  { to: "/#lokasi", label: "Lokasi" },
  { to: "/katalog", label: "Katalog" },
];

export function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    setOpen(false);

    const hashIndex = to.indexOf("#");

    if (hashIndex === -1) {
      navigate(to);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const path = to.substring(0, hashIndex) || "/";
      const hash = to.substring(hashIndex);

      if (location.pathname === "/" && path === "/") {
        if (hash === "#beranda") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        const element = document.querySelector(hash);
        if (element) {
          const offset = hash === "#lokasi" ? 15 : 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      } else {
        navigate(to);
      }
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative flex w-full items-center justify-between h-16">
          <Link
            to="/#beranda"
            onClick={(e) => handleClick(e, "/#beranda")}
            className="shrink-0 inline-flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-[#FFC107] rounded-lg flex items-center justify-center">
              <span className="text-[#002A6B] font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Mamung</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {menuLink.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={(e) => handleClick(e, link.to)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
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
            className={`md:hidden absolute top-full rounded-b-lg left-0 w-full bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ${
              isOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-4"
            }`}
          >
            <div className="p-4 space-y-3">
              {menuLink.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={(e) => handleClick(e, link.to)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
