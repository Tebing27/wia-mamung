import { useState, useEffect } from "react";
import {
  Search,
  X,
  ChevronRight,
  Filter,
  MapPin,
  Phone,
  Globe,
  Instagram,
  Facebook,
} from "lucide-react";
import { umkmList, categories } from "@/data/umkmData";

interface UmkmCatalogProps {
  onUmkmClick?: (umkmId: number) => void;
}

const HighlightText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, "gi");

  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span
            key={index}
            className="text-[#0B4EA2] font-bold bg-blue-100 rounded-sm"
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

export default function UmkmCatalog({ onUmkmClick }: UmkmCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
        setCurrentPage(0);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Items per page berdasarkan ukuran layar
  const itemsPerPage = isMobile ? 4 : 6;

  // Filter UMKM
  const filteredUmkm = umkmList.filter((umkm) => {
    const matchesCategory =
      selectedCategory === "Semua" ||
      umkm.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUmkm.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const paginatedUmkm = filteredUmkm.slice(startIndex, startIndex + itemsPerPage);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
    setCurrentPage(0);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(0);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#0B4EA2] text-white py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-20">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Katalog UMKM</h1>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 bg-white rounded-lg flex items-center px-4 py-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Cari nama UMKM, kategori..."
                className="bg-transparent flex-1 outline-none text-gray-700 ml-2"
              />
              {searchQuery && (
                <X
                  onClick={handleClearSearch}
                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                />
              )}
            </div>

            {/* Category Filter */}
            <div className="relative md:w-48">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full bg-white text-gray-700 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  <span className="text-sm md:text-base">
                    {selectedCategory}
                  </span>
                </div>
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${showCategoryDropdown ? "rotate-90" : ""
                    }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 border border-gray-200 max-h-48 overflow-y-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleCategorySelect(cat.value)}
                      className={`w-full px-4 py-3 text-left text-black text-sm hover:bg-gray-50 flex items-center justify-between transition-colors ${selectedCategory === cat.value
                          ? "bg-[#FFC107] font-semibold text-black"
                          : ""
                        }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.value && (
                        <span className="text-lg">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count & Pagination Info */}
      <div className="container mx-auto px-4 md:px-20 py-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600 text-sm md:text-base">
            Menampilkan{" "}
            <span className="font-semibold text-gray-900">
              {filteredUmkm.length}
            </span>{" "}
            UMKM
            {totalPages > 1 && (
              <span className="text-gray-500">
                {" "}• Halaman {currentPage + 1} dari {totalPages}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* UMKM Cards Grid */}
      <div className="container mx-auto px-4 md:px-20 pb-12">
        {filteredUmkm.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedUmkm.map((umkm) => (
              <div
                key={umkm.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow hover:border-[#0B4EA2] flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden flex-shrink-0">
                  <img
                    src={umkm.imageUrl}
                    alt={umkm.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-[#FFC107] text-black text-xs font-bold px-3 py-1 rounded-full">
                      {umkm.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Bagian atas */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                      <HighlightText text={umkm.name} highlight={searchQuery} />
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
                      <HighlightText
                        text={umkm.description}
                        highlight={searchQuery}
                      />
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4 text-xs text-gray-600 min-h-[3rem]">
                      {umkm.address && (
                        <div className="flex gap-2 items-start">
                          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#0B4EA2]" />
                          <p className="line-clamp-2">{umkm.address}</p>
                        </div>
                      )}
                      {umkm.phone && (
                        <div className="flex gap-2 items-center">
                          <Phone className="w-4 h-4 shrink-0 text-[#0B4EA2]" />
                          <a
                            href={`tel:${umkm.phone}`}
                            className="hover:text-[#0B4EA2] transition-colors"
                          >
                            {umkm.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Social Media & Links */}
                    <div className="flex gap-2 mb-4 flex-wrap min-h-[1.5rem]">
                      {umkm.instagram && (
                        <a
                          href={`https://instagram.com/${umkm.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#E4405F] transition-colors"
                          title="Instagram"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {umkm.facebook && (
                        <a
                          href={`https://facebook.com/${umkm.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#1877F2] transition-colors"
                          title="Facebook"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                      )}
                      {umkm.website && (
                        <a
                          href={`https://${umkm.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-[#0B4EA2] transition-colors"
                          title="Website"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-shrink-0">
                    {umkm.mapsUrl && (
                      <a
                        href={umkm.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-[#0B4EA2] text-white text-sm font-medium rounded-lg hover:bg-[#083d7f] transition-colors text-center"
                      >
                        Lihat di Maps
                      </a>
                    )}
                    {onUmkmClick && (
                      <button
                        onClick={() => onUmkmClick(umkm.id)}
                        className="flex-1 px-4 py-2 bg-[#FFC107] text-black text-sm font-medium rounded-lg hover:bg-[#FFB800] transition-colors cursor-pointer"
                      >
                        Detail
                      </button>
                    )}
                  </div>
                </div>
              </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                {/* Mobile: Simple Prev/Next with Page Info */}
                <div className="flex sm:hidden items-center gap-3 w-full">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#0B4EA2] text-white hover:bg-[#083d7f]"
                    }`}
                  >
                    ← Prev
                  </button>

                  <div className="px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-700 whitespace-nowrap">
                    {currentPage + 1} / {totalPages}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === totalPages - 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#0B4EA2] text-white hover:bg-[#083d7f]"
                    }`}
                  >
                    Next →
                  </button>
                </div>

                {/* Desktop: Full Pagination */}
                <div className="hidden sm:flex items-center gap-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#0B4EA2] text-white hover:bg-[#083d7f]"
                    }`}
                  >
                    ← Sebelumnya
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {(() => {
                      const maxVisible = 5;
                      let startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2));
                      let endPage = Math.min(totalPages, startPage + maxVisible);
                      
                      if (endPage - startPage < maxVisible) {
                        startPage = Math.max(0, endPage - maxVisible);
                      }

                      const pages = [];

                      // First page
                      if (startPage > 0) {
                        pages.push(
                          <button
                            key={0}
                            onClick={() => {
                              setCurrentPage(0);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-10 h-10 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
                          >
                            1
                          </button>
                        );
                        if (startPage > 1) {
                          pages.push(
                            <span key="dots1" className="w-10 h-10 flex items-center justify-center text-gray-400">
                              ...
                            </span>
                          );
                        }
                      }

                      // Visible pages
                      for (let i = startPage; i < endPage; i++) {
                        pages.push(
                          <button
                            key={i}
                            onClick={() => {
                              setCurrentPage(i);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className={`w-10 h-10 rounded-lg font-medium transition-all ${
                              currentPage === i
                                ? "bg-[#0B4EA2] text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            {i + 1}
                          </button>
                        );
                      }

                      // Last page
                      if (endPage < totalPages) {
                        if (endPage < totalPages - 1) {
                          pages.push(
                            <span key="dots2" className="w-10 h-10 flex items-center justify-center text-gray-400">
                              ...
                            </span>
                          );
                        }
                        pages.push(
                          <button
                            key={totalPages - 1}
                            onClick={() => {
                              setCurrentPage(totalPages - 1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-10 h-10 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
                          >
                            {totalPages}
                          </button>
                        );
                      }

                      return pages;
                    })()}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === totalPages - 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#0B4EA2] text-white hover:bg-[#083d7f]"
                    }`}
                  >
                    Selanjutnya →
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Tidak ada UMKM yang ditemukan
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Semua");
              }}
              className="px-6 py-2 bg-[#0B4EA2] text-white rounded-lg hover:bg-[#083d7f] transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
