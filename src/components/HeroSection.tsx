import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { getFeaturedUmkm } from "@/data/umkmData";

const umkmData = getFeaturedUmkm();

interface HeroSectionProps {
  onUmkmClick: (umkmId: number) => void;
}

export default function HeroSection({ onUmkmClick }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = umkmData[currentIndex];

  // Auto-play carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + umkmData.length) % umkmData.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % umkmData.length;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleLihatLokasi = () => {
    onUmkmClick(currentSlide.id);
  };

  return (
    <section className="bg-[#0B4EA2] text-white py-8 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-32">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left Content */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">UMKM Mamung</h1>
            <p className="text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              Temukan berbagai jenis usaha lokal, dari kuliner, kerajinan,
              sampai layanan jasa. Gunakan peta interaktif untuk mencari lokasi
              UMKM terdekat dan dukung perekonomian di sekitar kita.
            </p>

            {/* UMKM Card */}
            <div className="bg-white text-black rounded-lg p-4 md:p-6">
              <div className="text-xs md:text-sm text-gray-600 mb-2">
                UMKM SASUMA
              </div>
              
              {/* Mobile Layout - Stack vertically */}
              <div className="md:hidden">
                <div className="mb-3">
                  <h3 className="text-lg font-bold mb-2">
                    {currentSlide.name}
                  </h3>
                  {currentSlide.category && (
                    <span className="bg-[#FFC107] text-black text-xs font-bold px-3 py-1 rounded-md inline-block mb-2">
                      {currentSlide.category}
                    </span>
                  )}
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {currentSlide.description}
                  </p>
                </div>
                
                {/* Image with navigation */}
                <div className="relative">
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <Button
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#0B4EA2] hover:bg-[#083d7f] w-8 h-8 rounded-full"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0B4EA2] hover:bg-[#083d7f] w-8 h-8 rounded-full"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Desktop Layout - Side by side */}
              <div className="hidden md:flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl lg:text-2xl font-bold mb-2">
                    {currentSlide.name}{" "}
                    {currentSlide.category && (
                      <span className="bg-[#FFC107] text-black text-xs font-bold px-3 py-1 rounded-md inline-block mb-2">
                        {currentSlide.category}
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {currentSlide.description}
                  </p>
                </div>
                <div className="relative ml-4 flex-shrink-0">
                  <img
                    src={currentSlide.imageUrl}
                    alt={currentSlide.name}
                    className="w-48 lg:w-64 h-28 lg:h-32 object-cover rounded-lg"
                  />
                  <Button
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-[#0B4EA2] hover:bg-[#083d7f] w-8 h-8 rounded-full"
                    onClick={prevSlide}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-[#0B4EA2] hover:bg-[#083d7f] w-8 h-8 rounded-full"
                    onClick={nextSlide}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <button
                onClick={handleLihatLokasi}
                className="text-[#0B4EA2] text-xs md:text-sm font-semibold hover:underline inline-flex items-center gap-1 mt-3 md:mt-0"
              >
                Lihat Lokasi →
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2 justify-center mt-4">
              {umkmData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-white w-6' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center order-first md:order-none">
            <img
              src="src\assets\logoumkm.jpeg"
              alt="Logo"
              className="rounded-lg shadow-2xl w-full max-w-md h-64 sm:h-80 md:h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
