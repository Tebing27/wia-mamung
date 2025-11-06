"use client"; // Tetap gunakan ini jika Anda di Next.js App Router

import { useState } from "react";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";

// 1. Data menu diperbarui sesuai gambar
const menuLink = [
  { href: "#", label: "Beranda" },
  { href: "#", label: "Wilayah" },
  { href: "#", label: "Lokasi" },
  { href: "#", label: "Toko" },
];

export function Navbar() {
  const [isOpen, setOpen] = useState(false);

  return (
    // Latar belakang header (biru)
    <header className="w-full p-4 bg-[#0B4EA2]">
      <div className="mx-auto max-w-7xl">
        {/* 2. Navbar dibuat solid putih dengan shadow, sesuai gambar */}
        <nav className="relative flex w-full items-center justify-between rounded-xl bg-white p-4 shadow-md md:rounded-2xl">
          {/* 3. Logo diubah menjadi "Logo." */}
          <a href="#" className="shrink-0 inline-flex items-center gap-4">
            <span className="text-2xl md:text-3xl font-bold text-slate-900">
              Mamung
            </span>
          </a>

          {/* 4. Link menu tengah (Desktop) - DIPERBAIKI */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-6">
            {menuLink.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-medium text-black transition-colors hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* 5. Item sebelah kanan (Desktop) - DIPERBAIKI */}
          <div className="hidden md:flex shrink-0 items-center space-x-4">
            <a
              href="#"
              className="flex items-center space-x-1 text-slate-700 hover:text-slate-900"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">0</span>
            </a>
            <button className="flex items-center space-x-1 p-2 rounded-lg text-slate-700 hover:bg-gray-100">
              <span className="font-medium">ID</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <a
              href="#"
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
            >
              Daftar
            </a>
          </div>

          {/* 6. Tombol Hamburger (Mobile) - DIPERBAIKI */}
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

          {/* 7. Menu Dropdown (Mobile) - (Sudah benar) */}
          <div
            className={`md:hidden absolute top-full left-0 w-full mt-2 transition-all duration-300 ${
              isOpen
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-4"
            }`}
          >
            <div className="rounded-lg bg-white shadow-lg p-4 space-y-3">
              {/* Link dari menuLink */}
              {menuLink.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  {link.label}
                </a>
              ))}

              <hr />

              {/* Link tambahan dari sisi kanan */}
              <a
                href="#"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Keranjang (0)</span>
              </a>
              <button className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">
                <span className="font-medium">ID</span>
                <ChevronDown className="h-4 w-4" />
                <span>Bahasa</span>
              </button>
              <a
                href="#"
                className="block w-full bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium text-center hover:bg-yellow-500 transition-colors"
              >
                Daftar
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
