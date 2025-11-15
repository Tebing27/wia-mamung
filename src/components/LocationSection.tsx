import {
  ChevronUp,
  ChevronDown,
  Search,
  Filter,
  X,
  MapPin,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Utensils,
  Shirt,
  ShoppingBag,
  Briefcase,
  Store,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { umkmList, categories } from "@/data/umkmData";

// Constants
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
const ITEMS_PER_PAGE = 4;
const MAP_ZOOM_LEVEL = 17;
const MAP_ZOOM_DURATION = 2000;
const SCROLL_DELAY = 800;
const ZOOM_RETRY_DELAY = 300;
const MAX_ZOOM_RETRIES = 20;

// Map initial view (Jabodetabek area)
const MAP_CENTER = {
  longitude: 106.827,
  latitude: -6.2088,
};

// Initial zoom levels (lower = more zoomed out)
const INITIAL_ZOOM_MOBILE = 8;
const INITIAL_ZOOM_DESKTOP = 9;

// Category icon mapping
const CATEGORY_ICONS: { [key: string]: React.ElementType } = {
  Kuliner: Utensils,
  Fashion: Shirt,
  Perdagangan: ShoppingBag,
  Jasa: Briefcase,
};

interface LocationSectionProps {
  selectedCategory: string | null;
  selectedUmkmId: number | null;
}

export default function LocationSection({
  selectedCategory: propSelectedCategory,
  selectedUmkmId: propSelectedUmkmId,
}: LocationSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelectedCategory, setLocalSelectedCategory] =
    useState<string>("Semua");
  const [currentPage, setCurrentPage] = useState(0);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedUmkmId, setSelectedUmkmId] = useState<number | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMobileMapLoaded, setIsMobileMapLoaded] = useState(false);
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const mapRef = useRef<MapRef>(null);
  const mobileMapRef = useRef<MapRef>(null);

  // Sync local category with prop category when it changes
  useEffect(() => {
    if (propSelectedCategory) {
      setLocalSelectedCategory(propSelectedCategory);
    }
  }, [propSelectedCategory]);

  // Zoom to marker when UMKM is selected from HeroSection
  useEffect(() => {
    if (!propSelectedUmkmId) return;

    const selectedUmkm = umkmList.find((u) => u.id === propSelectedUmkmId);
    if (!selectedUmkm) return;

    const isMobile = window.innerWidth < 768;
    const targetMapRef = isMobile ? mobileMapRef : mapRef;
    const targetMapLoaded = isMobile ? isMobileMapLoaded : isMapLoaded;

    const attemptZoom = (retries = 0) => {
      if (targetMapLoaded && targetMapRef.current) {
        targetMapRef.current.flyTo({
          center: [selectedUmkm.longitude, selectedUmkm.latitude],
          zoom: MAP_ZOOM_LEVEL,
          duration: MAP_ZOOM_DURATION,
        });
      } else if (retries < MAX_ZOOM_RETRIES) {
        setTimeout(() => attemptZoom(retries + 1), ZOOM_RETRY_DELAY);
      }
    };

    setTimeout(() => attemptZoom(), SCROLL_DELAY);
  }, [propSelectedUmkmId, isMapLoaded, isMobileMapLoaded]);

  // Use local category as active category
  const activeCategory = localSelectedCategory;

  // Combined filter: category + search
  const filteredUmkmList = umkmList.filter((umkm) => {
    // Filter by category
    const matchesCategory =
      activeCategory === "Semua" ||
      umkm.category.toLowerCase() === activeCategory.toLowerCase();

    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Handle category selection from dropdown
  const handleCategorySelect = (category: string) => {
    setLocalSelectedCategory(category);
    setShowCategoryDropdown(false);
    setCurrentPage(0); // Reset to first page
  };

  // Reset category filter
  const handleResetFilter = () => {
    setLocalSelectedCategory("Semua");
    setCurrentPage(0);
  };

  // Highlight search term in text
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-[#FFC107] text-black px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Handle marker click
  const handleMarkerClick = (umkmId: number) => {
    setSelectedUmkmId(umkmId);
  };

  // Handle zoom to location
  const handleZoomToLocation = (umkmId: number) => {
    const umkm = umkmList.find((u) => u.id === umkmId);
    if (!umkm) return;

    const isMobile = window.innerWidth < 768;
    const targetMapRef = isMobile ? mobileMapRef : mapRef;

    if (isMobile) {
      const mapSection = document.querySelector('.md\\:hidden .rounded-b-lg');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    const zoomDelay = isMobile ? SCROLL_DELAY : 0;
    setTimeout(() => {
      if (targetMapRef.current) {
        targetMapRef.current.flyTo({
          center: [umkm.longitude, umkm.latitude],
          zoom: MAP_ZOOM_LEVEL,
          duration: MAP_ZOOM_DURATION,
        });
      }
    }, zoomDelay);
  };

  const handleClosePopup = () => setSelectedUmkmId(null);

  // Pagination
  const totalPages = Math.ceil(filteredUmkmList.length / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const visibleUmkmList = filteredUmkmList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Check if at start or end for desktop
  const isAtStart = currentPage === 0;
  const isAtEnd = currentPage >= totalPages - 1;

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(0); // Reset to first page when searching
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(0);
  };

  // Pagination (both mobile and desktop)
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };
  return (
    <section id="lokasi" className="py-12 md:py-20 px-4 md:px-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center mb-8 md:mb-16">
          Lokasi
        </h2>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-0">
          {/* Sidebar - Mobile (Top) */}
          <div className="bg-[#003F88] rounded-t-lg p-3">
            {/* Search */}
            <div className="bg-white rounded-lg p-2 mb-3 flex items-center gap-2 shadow-sm">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Cari nama UMKM, kategori..."
                className="bg-transparent flex-1 outline-none text-sm text-gray-700"
              />
              {searchQuery && (
                <X
                  onClick={handleClearSearch}
                  className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
                />
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-3 relative">
              {/* Category Dropdown */}
              <div className="flex-1 relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full bg-white rounded-lg px-3 py-2 text-xs flex items-center gap-2 hover:bg-gray-50 shadow-sm"
                >
                  <Filter className="w-3 h-3" />
                  <span className="flex-1 text-left truncate">
                    {activeCategory || "Semua"}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${showCategoryDropdown ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => handleCategorySelect(cat.value)}
                        className={`w-full px-3 py-2 text-xs text-left hover:bg-gray-50 flex items-center justify-between ${activeCategory === cat.value
                            ? "bg-[#FFC107] font-semibold"
                            : ""
                          }`}
                      >
                        <span>{cat.label}</span>
                        {activeCategory === cat.value && (
                          <span className="text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-3 px-1">
              <p className="text-white text-xs">
                Menampilkan{" "}
                <span className="font-bold">{filteredUmkmList.length}</span>{" "}
                dari {umkmList.length} UMKM
                {searchQuery && (
                  <span className="text-[#FFC107]"> • "{searchQuery}"</span>
                )}
                {activeCategory !== "Semua" && !searchQuery && (
                  <span className="text-[#FFC107]"> • {activeCategory}</span>
                )}
              </p>
            </div>

            {/* UMKM Cards - Show current page */}
            {filteredUmkmList.length === 0 ? (
              <div className="bg-white rounded-lg p-6 mb-3 text-center">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-semibold mb-1 text-gray-700">
                  Tidak ada hasil
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  {searchQuery
                    ? `Tidak ditemukan UMKM dengan kata kunci "${searchQuery}"`
                    : "Tidak ada UMKM di kategori ini"}
                </p>
                <button
                  onClick={() => {
                    handleClearSearch();
                    handleResetFilter();
                  }}
                  className="text-xs text-[#003F88] hover:underline font-semibold"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              visibleUmkmList.map((umkm) => (
                <div key={umkm.id} className="bg-white rounded-lg p-3 mb-3">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 bg-gray-300 rounded-lg shrink-0 overflow-hidden">
                      <img
                        src={umkm.imageUrl}
                        alt={umkm.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm font-bold leading-tight flex-1">
                          {searchQuery
                            ? highlightText(umkm.name, searchQuery)
                            : umkm.name}
                        </h3>
                        <span className="bg-[#FFC107] text-black text-[9px] font-bold px-2 py-0.5 rounded shrink-0 ml-1">
                          {searchQuery
                            ? highlightText(umkm.category, searchQuery)
                            : umkm.category}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 mb-2 line-clamp-2">
                        {searchQuery
                          ? highlightText(umkm.description, searchQuery)
                          : umkm.description}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedUmkmId(umkm.id)}
                          className="text-xs text-[#003F88] font-semibold hover:underline"
                        >
                          Lihat Detail
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => handleZoomToLocation(umkm.id)}
                          className="text-xs text-[#003F88] font-semibold hover:underline"
                        >
                          Lihat Lokasi
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Navigation Buttons */}
            {filteredUmkmList.length > 0 && (
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handlePrevPage}
                  disabled={isAtStart}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${isAtStart
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-[#003F88] hover:bg-gray-100"
                    }`}
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={isAtEnd}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${isAtEnd
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-[#003F88] hover:bg-gray-100"
                    }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Map - Mobile (Bottom) with real Mapbox */}
          <div className="rounded-b-lg h-[400px] sm:h-[500px] relative overflow-hidden">
            <Map
              ref={mobileMapRef}
              mapboxAccessToken={MAPBOX_TOKEN}
              initialViewState={{
                ...MAP_CENTER,
                zoom: INITIAL_ZOOM_MOBILE,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v12"
              onLoad={() => setIsMobileMapLoaded(true)}
            >
              {/* Navigation Controls */}
              <NavigationControl position="bottom-right" />

              {/* UMKM Markers - Filtered by category */}
              {filteredUmkmList.map((umkm) => {
                const IconComponent = CATEGORY_ICONS[umkm.category] || Store;
                return (
                  <Marker
                    key={umkm.id}
                    longitude={umkm.longitude}
                    latitude={umkm.latitude}
                    anchor="bottom"
                  >
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-3 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center"
                      style={{ backgroundColor: umkm.color }}
                      onClick={() => handleMarkerClick(umkm.id)}
                      title={`${umkm.name} - ${umkm.category}`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </Marker>
                );
              })}
            </Map>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-0 items-start">
          {/* Sidebar */}
          <div className="bg-[#003F88] rounded-l-lg p-5 h-[850px] flex flex-col overflow-hidden">
            {/* Search */}
            <div className="bg-white rounded-lg p-3 mb-3 flex items-center gap-2 shadow-sm">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Cari nama UMKM, kategori..."
                className="bg-transparent flex-1 outline-none text-sm text-gray-700"
              />
              {searchQuery && (
                <X
                  onClick={handleClearSearch}
                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
                />
              )}
            </div>

            {/* Filters */}
            <div className="mb-4 relative">
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full bg-white rounded-lg px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 shadow-sm"
                >
                  <Filter className="w-4 h-4" />
                  <span className="flex-1 text-left">
                    {activeCategory || "Semua"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showCategoryDropdown ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => handleCategorySelect(cat.value)}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center justify-between ${activeCategory === cat.value
                            ? "bg-[#FFC107] font-semibold"
                            : ""
                          }`}
                      >
                        <span>{cat.label}</span>
                        {activeCategory === cat.value && (
                          <span className="text-xs">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Jumlah total UMKM */}
            <div className="mb-3 px-1">
              <p className="text-white text-xs">
                Menampilkan{" "}
                <span className="font-bold">{filteredUmkmList.length}</span>{" "}
                dari {umkmList.length} UMKM
                {searchQuery && (
                  <span className="text-[#FFC107]"> • "{searchQuery}"</span>
                )}
                {activeCategory !== "Semua" && !searchQuery && (
                  <span className="text-[#FFC107]"> • {activeCategory}</span>
                )}
              </p>
            </div>

            {/* Jika nama UMKM / Kategori tidak ditemuka */}
            <div className="flex-1 flex flex-col gap-3 min-h-0">
              {filteredUmkmList.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-semibold mb-1">
                      Tidak ada hasil
                    </p>
                    <p className="text-xs opacity-75">
                      {searchQuery
                        ? `Tidak ditemukan UMKM dengan kata kunci "${searchQuery}"`
                        : "Tidak ada UMKM di kategori ini"}
                    </p>
                    <button
                      onClick={() => {
                        handleClearSearch();
                        handleResetFilter();
                      }}
                      className="mt-3 text-xs text-[#FFC107] hover:underline font-semibold"
                    >
                      Reset Filter
                    </button>
                  </div>
                </div>
              ) : (
                visibleUmkmList.map((umkm) => (
                  <div
                    key={umkm.id}
                    ref={(el) => {
                      cardRefs.current[umkm.id] = el;
                    }}
                    className="bg-white rounded-xl p-3 shadow-sm shrink-0 transition-all duration-300"
                  >
                    <div className="flex gap-3 h-full">
                      <div className="w-[95px] h-[111px] bg-gray-300 rounded-lg shrink-0 overflow-hidden">
                        <img
                          src={umkm.imageUrl}
                          alt={umkm.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="text-base font-bold text-gray-900 leading-tight break-words flex-1">
                              {searchQuery
                                ? highlightText(umkm.name, searchQuery)
                                : umkm.name}
                            </h3>
                            <span className="bg-[#FFC107] text-black text-[10px] font-bold px-2 py-1 rounded shrink-0">
                              {searchQuery
                                ? highlightText(umkm.category, searchQuery)
                                : umkm.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-600 leading-tight line-clamp-3">
                            {searchQuery
                              ? highlightText(umkm.description, searchQuery)
                              : umkm.description}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => setSelectedUmkmId(umkm.id)}
                            className="text-xs text-[#003F88] font-semibold hover:underline"
                          >
                            Lihat Detail
                          </button>
                          <span className="text-gray-300">|</span>
                          <button
                            onClick={() => handleZoomToLocation(umkm.id)}
                            className="text-xs text-[#003F88] font-semibold hover:underline"
                          >
                            Lihat Lokasi
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Navigation Buttons - Up/Down at bottom */}
            <div className="flex justify-center gap-3 pt-4 shrink-0">
              <button
                onClick={handlePrevPage}
                disabled={isAtStart}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${isAtStart
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-[#003F88] hover:bg-gray-100"
                  }`}
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPage}
                disabled={isAtEnd}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${isAtEnd
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-[#003F88] hover:bg-gray-100"
                  }`}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Map - Mapbox Integration */}
          <div className="rounded-r-lg h-[850px] relative overflow-hidden">
            <Map
              ref={mapRef}
              mapboxAccessToken={MAPBOX_TOKEN}
              initialViewState={{
                ...MAP_CENTER,
                zoom: INITIAL_ZOOM_DESKTOP,
              }}
              padding={{ left: 350 }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v12"
              onLoad={() => setIsMapLoaded(true)}
            >
              {/* Navigation Controls */}
              <NavigationControl position="bottom-right" />

              {/* UMKM Markers - Filtered by category */}
              {filteredUmkmList.map((umkm) => {
                const IconComponent = CATEGORY_ICONS[umkm.category] || Store;
                return (
                  <Marker
                    key={umkm.id}
                    longitude={umkm.longitude}
                    latitude={umkm.latitude}
                    anchor="bottom"
                  >
                    <div
                      className="w-10 h-10 rounded-full border-3 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center"
                      style={{ backgroundColor: umkm.color }}
                      onClick={() => handleMarkerClick(umkm.id)}
                      title={`${umkm.name} - ${umkm.category}`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </Marker>
                );
              })}
            </Map>
          </div>
        </div>

        {/* Popup Card Overlay - Fixed position overlay */}
        {selectedUmkmId &&
          (() => {
            const selectedUmkm = umkmList.find((u) => u.id === selectedUmkmId);
            if (!selectedUmkm) return null;

            return (
              <div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedUmkmId(null)}
              >
                <div
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-[420px] max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Image */}
                  <div className="relative h-[240px] bg-gray-200">
                    <img
                      src={selectedUmkm.imageUrl}
                      alt={selectedUmkm.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedUmkmId(null)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-lg"
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title & Category */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedUmkm.name}
                      </h3>
                      <span className="bg-[#FFC107] text-black text-sm font-bold px-3 py-1 rounded-md shrink-0 ml-2">
                        {selectedUmkm.category}
                      </span>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-2 mb-4 text-gray-600">
                      <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed">
                        {selectedUmkm.address}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-4">
                      {selectedUmkm.description}
                    </p>

                    {/* License */}
                    <div className="flex items-center gap-2 mb-4 text-gray-700">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                      </svg>
                      <span className="text-sm">{selectedUmkm.license}</span>
                    </div>

                    {/* Social Media */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <a
                        href={`https://instagram.com/${selectedUmkm.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-pink-600"
                      >
                        <Instagram className="w-5 h-5 text-pink-600" />
                        <span>{selectedUmkm.instagram}</span>
                      </a>
                      <a
                        href={`https://${selectedUmkm.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
                      >
                        <Globe className="w-5 h-5 text-blue-600" />
                        <span>{selectedUmkm.website}</span>
                      </a>
                      <a
                        href={`https://facebook.com/${selectedUmkm.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-700"
                      >
                        <Facebook className="w-5 h-5 text-blue-700" />
                        <span>{selectedUmkm.facebook}</span>
                      </a>
                      <a
                        href={`https://wa.me/${selectedUmkm.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-green-600"
                      >
                        <Phone className="w-5 h-5 text-green-600" />
                        <span>{selectedUmkm.phone}</span>
                      </a>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {/* Google Maps Button */}
                      <a
                        href={
                          selectedUmkm.mapsUrl ||
                          `https://www.google.com/maps/search/?api=1&query=${selectedUmkm.latitude},${selectedUmkm.longitude}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <MapPin className="w-5 h-5" />
                        Google Maps
                      </a>

                      {/* Close Button */}
                      <button
                        onClick={handleClosePopup}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-colors"
                      >
                        Tutup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
      </div>
    </section>
  );
}
