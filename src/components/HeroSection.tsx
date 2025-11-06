"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import umkm1 from "../assets/umkm1.webp";
import umkm2 from "../assets/umkm2.png";
import umkm3 from "../assets/umkm3.jpg";
import umkm4 from "../assets/umkm4.jpg";

const umkmData = [
  {
    id: 1,
    name: "Saung UMKM",
    tag: "Kuliner",
    description: "Bakso, Mie ayam, Es Oyen dll",
    omset: "Rp. 10.000.000",
    imageUrl: umkm1,
    locationUrl: "#",
  },
  {
    id: 2,
    name: "Alesha Kuliner",
    tag: "Kuliner",
    description:
      "Dessert Homemade: Singkong thailand, Ketan durian, Ketan srikaya, Dessert pandan, Ketan mangga",
    omset: "Rp. 8.500.000",
    imageUrl: umkm2,
    locationUrl: "#",
  },
  {
    id: 3,
    name: "Jajanan korea",
    tag: "Kuliner", // Jika tidak ada tag, tag tidak akan ditampilkan
    description: "Rapoki (ramen topoki), Topoki, Sate odeng, Kimbab, Dimsum",
    omset: "Rp. 12.000.000",
    imageUrl: umkm3,
    locationUrl: "#",
  },
  {
    id: 4,
    name: "Ucuynoel",
    tag: "Pakaian", // Jika tidak ada tag, tag tidak akan ditampilkan
    description: "Baju, celana, sendal, sepatu",
    omset: "Rp. 12.000.000",
    imageUrl: umkm4,
    locationUrl: "#",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = umkmData[currentIndex];

  // 4. Buat fungsi untuk tombol
  const prevSlide = () => {
    // Logika untuk kembali ke slide sebelumnya (dengan looping)
    const newIndex = (currentIndex - 1 + umkmData.length) % umkmData.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    // Logika untuk ke slide berikutnya (dengan looping)
    const newIndex = (currentIndex + 1) % umkmData.length;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="bg-[#0B4EA2] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-32">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h1 className="text-5xl font-bold mb-6">UMKM SASUMA.</h1>
            <p className="text-lg mb-8 leading-relaxed">
              Temukan berbagai jenis usaha lokal, dari kuliner, kerajinan,
              sampai layanan jasa. Gunakan peta interaktif untuk mencari lokasi
              UMKM terdekat dan dukung perekonomian di sekitar kita.
            </p>

            <div className="bg-white text-black rounded-lg p-6 max-w-7xl">
              <div className="text-sm text-gray-600 mb-2">
                UMKM SASUMA - PENGASINAN
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  {/* 5. Ganti konten statis dengan data dari state */}
                  <h3 className="text-2xl font-bold mb-2">
                    {currentSlide.name}{" "}
                    {currentSlide.tag && (
                      <span className="bg-[#FFC107] text-black text-xs font-bold px-3 py-1 rounded-md inline-block mb-2">
                        {currentSlide.tag}
                      </span>
                    )}
                  </h3>

                  <p className="text-sm text-gray-600 mb-1">
                    {currentSlide.description}
                  </p>
                  <p className="text-sm font-semibold">
                    Omset Penjualan - {currentSlide.omset}
                  </p>
                </div>
                <div className="relative ml-4">
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.name}
                    className="w-64 h-32 object-cover rounded-lg"
                  />
                  <Button
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-[#0B4EA2] hover:bg-[#083d7f] w-8 h-8 rounded-full"
                    // 6. Tambahkan onClick
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-[#0B4EA2] hover:bg-[#083d7f] w-8 h-8 rounded-full"
                    // 6. Tambahkan onClick
                    onClick={nextSlide}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <a
                href="#"
                className="text-[#0B4EA2] text-sm font-semibold hover:underline"
              >
                Lihat Lokasi →
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center md:flex order-first md:order-none">
            <img
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=800&fit=crop"
              alt="Store Interior"
              className="rounded-lg shadow-2xl w-full max-w-md h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
