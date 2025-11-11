import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Search, Filter, X, DollarSign } from "lucide-react";
import { useState } from "react";
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox token from environment variable
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

// Available categories
const categories = [
    { value: "Semua", label: "Semua Kategori" },
    { value: "Kuliner", label: "Kuliner" },
    { value: "Fashion", label: "Fashion" },
    { value: "Perdagangan", label: "Perdagangan" },
    { value: "Jasa", label: "Jasa" }
];

// UMKM data with coordinates (example coordinates around Jakarta area)
const umkmList = [
    {
        id: 1,
        name: "Tebing",
        category: "Kuliner",
        description: "Pecel lele, daun singkong, dan lontong sayur",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop",
        latitude: -6.2088,
        longitude: 106.8456,
        color: "#EF4444" // red
    },
    {
        id: 2,
        name: "Cinangka",
        category: "Kuliner",
        description: "Es teh, kopi, jus buah segar",
        imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop",
        latitude: -6.2188,
        longitude: 106.8556,
        color: "#3B82F6" // blue
    },
    {
        id: 3,
        name: "Kedaung",
        category: "Fashion",
        description: "Baju, celana, aksesoris",
        imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop",
        latitude: -6.2288,
        longitude: 106.8656,
        color: "#F59E0B" // yellow
    },
    {
        id: 4,
        name: "Baju Mobile Legend",
        category: "Fashion",
        description: "Baju, celana, aksesoris",
        imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop",
        latitude: -6.2188,
        longitude: 106.8756,
        color: "#10B981" // green
    },
    {
        id: 5,
        name: "Warung Sate Pak Budi",
        category: "Kuliner",
        description: "Sate ayam, kambing, dan lontong",
        imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=200&h=200&fit=crop",
        latitude: -6.2388,
        longitude: 106.8556,
        color: "#8B5CF6" // purple
    },
    {
        id: 6,
        name: "Toko Elektronik Jaya",
        category: "Perdagangan",
        description: "HP, laptop, aksesoris",
        imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
        latitude: -6.2288,
        longitude: 106.8856,
        color: "#EC4899" // pink
    },
    {
        id: 7,
        name: "Bengkel Motor Sejahtera",
        category: "Jasa",
        description: "Service motor, ganti oli",
        imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=200&h=200&fit=crop",
        latitude: -6.2488,
        longitude: 106.8656,
        color: "#06B6D4" // cyan
    },
    {
        id: 8,
        name: "Truk Priok Aloksander",
        category: "Fashion",
        description: "Baju, celana, aksesoris",
        imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop",
        latitude: -6.2388,
        longitude: 106.8756,
        color: "#FBBF24" // amber
    }
];

interface LocationSectionProps {
    selectedCategory: string | null;
}

export default function LocationSection({ selectedCategory: propSelectedCategory }: LocationSectionProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [localSelectedCategory, setLocalSelectedCategory] = useState<string>("Semua");
    const [minPrice, setMinPrice] = useState("0");
    const [maxPrice, setMaxPrice] = useState("1000");
    const [currentUmkmIndex, setCurrentUmkmIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    // Filter UMKM based on selected category from props or local state
    const activeCategory = propSelectedCategory || localSelectedCategory;
    
    // Combined filter: category + search
    const filteredUmkmList = umkmList.filter(umkm => {
        // Filter by category
        const matchesCategory = activeCategory === "Semua" || 
            umkm.category.toLowerCase() === activeCategory.toLowerCase();
        
        // Filter by search query
        const matchesSearch = searchQuery === "" || 
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
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return parts.map((part, i) => 
            part.toLowerCase() === query.toLowerCase() 
                ? <mark key={i} className="bg-[#FFC107] text-black px-0.5 rounded">{part}</mark>
                : part
        );
    };

    // Desktop: show 4 cards at a time
    const itemsPerPage = 4;
    const totalPages = Math.ceil(filteredUmkmList.length / itemsPerPage);

    const currentUmkm = filteredUmkmList[currentUmkmIndex] || umkmList[0];

    // Get visible UMKM for desktop pagination
    const startIndex = currentPage * itemsPerPage;
    const visibleUmkmList = filteredUmkmList.slice(startIndex, startIndex + itemsPerPage);

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

    const handleCategoryFilter = () => {
        setShowCategoryDropdown(!showCategoryDropdown);
    };

    // Mobile navigation (single UMKM)
    const handlePrevUmkm = () => {
        setCurrentUmkmIndex((prev) => (prev === 0 ? umkmList.length - 1 : prev - 1));
    };

    const handleNextUmkm = () => {
        setCurrentUmkmIndex((prev) => (prev === umkmList.length - 1 ? 0 : prev + 1));
    };

    const handleViewLocation = (umkmName: string) => {
        console.log("View location for:", umkmName);
        // Navigate to map or show location details
    };

    const handleCloseFilter = () => {
        console.log("Close filter");
        // Reset filters or close sidebar
    };

    // Desktop pagination (multiple UMKM)
    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    };
    return (
        <section className="py-12 md:py-20 px-4 md:px-20 bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-8 md:mb-16">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4">
                        Lokasi
                    </h2>
                    {(propSelectedCategory || (activeCategory !== "Semua")) && (
                        <div className="flex items-center justify-center gap-2">
                            <span className="bg-[#FFC107] text-black text-sm font-bold px-4 py-2 rounded-lg">
                                Filter: {propSelectedCategory || activeCategory}
                            </span>
                            <button
                                onClick={handleResetFilter}
                                className="text-sm text-[#003F88] hover:underline font-semibold"
                            >
                                Lihat Semua
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    {/* Sidebar - Mobile (Top) */}
                    <div className="bg-[#003F88] rounded-t-lg p-4">
                        {/* Search */}
                        <div className="bg-[#F9F5F0] rounded-lg p-3 mb-3 flex items-center gap-2">
                            <Search className="w-4 h-4 text-gray-600" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Cari nama UMKM, kategori..."
                                className="bg-transparent flex-1 outline-none text-sm"
                            />
                            {searchQuery && (
                                <X
                                    onClick={handleClearSearch}
                                    className="w-4 h-4 text-gray-600 cursor-pointer hover:text-gray-800"
                                />
                            )}
                        </div>

                        {/* Filters */}
                        <div className="flex gap-2 mb-4">
                            <button
                                onClick={handleCategoryFilter}
                                className="bg-[#F9F5F0] rounded-md px-4 py-2 text-sm flex items-center gap-2 flex-1 hover:bg-gray-200"
                            >
                                <Filter className="w-4 h-4" />
                                {activeCategory}
                            </button>
                            <button className="bg-[#F9F5F0] rounded-md px-4 py-2 text-sm flex items-center gap-1 hover:bg-gray-200">
                                <DollarSign className="w-4 h-4" />
                                {minPrice}
                            </button>
                            <button className="bg-[#F9F5F0] rounded-md px-4 py-2 text-sm flex items-center gap-1 hover:bg-gray-200">
                                <DollarSign className="w-4 h-4" />
                                {maxPrice}
                            </button>
                        </div>

                        {/* UMKM Card */}
                        <div className="bg-white rounded-lg p-3 mb-4">
                            <div className="flex gap-3">
                                <div className="w-20 h-20 bg-gray-300 rounded-lg flex-shrink-0 overflow-hidden">
                                    <img
                                        src={currentUmkm.imageUrl}
                                        alt={currentUmkm.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-base font-bold mb-1">{currentUmkm.name}</h3>
                                            <span className="bg-[#FFC107] text-black text-[10px] font-semibold px-2 py-0.5 rounded inline-block">
                                                {currentUmkm.category}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handlePrevUmkm}
                                                className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={handleNextUmkm}
                                                className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-700 mb-2 line-clamp-2">
                                        {currentUmkm.description}
                                    </p>
                                    <button
                                        onClick={() => handleViewLocation(currentUmkm.name)}
                                        className="text-xs text-[#003F88] font-semibold flex items-center gap-0.5 hover:underline"
                                    >
                                        Lihat Lokasi
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Yellow Close Buttons */}
                        <div className="flex justify-center gap-3 mb-3">
                            <button
                                onClick={handleCloseFilter}
                                className="w-8 h-8 rounded-full bg-[#FFC107] flex items-center justify-center shadow-md hover:bg-yellow-500"
                            >
                                <X className="w-4 h-4 text-black" />
                            </button>
                            <button
                                onClick={handleCloseFilter}
                                className="w-8 h-8 rounded-full bg-[#FFC107] flex items-center justify-center shadow-md hover:bg-yellow-500"
                            >
                                <X className="w-4 h-4 text-black" />
                            </button>
                        </div>
                    </div>

                    {/* Map - Mobile (Bottom) */}
                    <div className="bg-gray-200 rounded-b-lg h-[500px] relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                            {/* Map placeholder */}
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <p className="text-sm">Interactive Map</p>
                            </div>

                            {/* Map markers - Mobile positioned */}
                            <div className="absolute top-[180px] left-[100px] w-12 h-12 bg-red-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v20c5.06-.5 8.97-4.79 8.97-10s-3.91-9.5-8.97-10z" />
                                </svg>
                            </div>
                            <div className="absolute top-[250px] left-[80px] w-12 h-12 bg-blue-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                                </svg>
                            </div>
                            <div className="absolute top-[260px] left-[160px] w-12 h-12 bg-yellow-400 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                </svg>
                            </div>
                            <div className="absolute top-[330px] left-[145px] w-12 h-12 bg-green-700 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                </svg>
                            </div>
                            <div className="absolute top-[380px] left-[130px] w-12 h-12 bg-blue-800 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                            <div className="absolute top-[200px] left-[220px] w-10 h-10 bg-yellow-500 rounded-full border-3 border-white shadow-lg"></div>
                            <div className="absolute top-[300px] left-[250px] w-10 h-10 bg-yellow-600 rounded-full border-3 border-white shadow-lg"></div>
                        </div>

                        {/* Map controls */}
                        <div className="absolute bottom-4 right-4 bg-white rounded shadow-lg">
                            <button className="p-2 border-b hover:bg-gray-50 text-lg font-bold">+</button>
                            <button className="p-2 hover:bg-gray-50 text-lg font-bold">−</button>
                        </div>
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
                        <div className="flex gap-2 mb-4 relative">
                            {/* Category Dropdown */}
                            <div className="flex-1 relative">
                                <button
                                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                    className="w-full bg-white rounded-lg px-3 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 shadow-sm"
                                >
                                    <Filter className="w-4 h-4" />
                                    <span className="flex-1 text-left">{activeCategory || "Semua"}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {/* Dropdown Menu */}
                                {showCategoryDropdown && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.value}
                                                onClick={() => handleCategorySelect(cat.value)}
                                                className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center justify-between ${
                                                    activeCategory === cat.value ? 'bg-[#FFC107] font-semibold' : ''
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
                            
                            <button className="bg-white rounded-lg px-3 py-2 text-sm hover:bg-gray-50 shadow-sm">
                                Minimal
                            </button>
                            <button className="bg-white rounded-lg px-3 py-2 text-sm hover:bg-gray-50 shadow-sm">
                                Maksimal
                            </button>
                        </div>

                        {/* Results Count */}
                        <div className="mb-3 px-1">
                            <p className="text-white text-xs">
                                Menampilkan <span className="font-bold">{filteredUmkmList.length}</span> dari {umkmList.length} UMKM
                                {searchQuery && (
                                    <span className="text-[#FFC107]"> • "{searchQuery}"</span>
                                )}
                                {activeCategory !== "Semua" && !searchQuery && (
                                    <span className="text-[#FFC107]"> • {activeCategory}</span>
                                )}
                            </p>
                        </div>

                        {/* UMKM Cards - Fixed height for consistency */}
                        <div className="flex-1 flex flex-col gap-3 min-h-0">
                            {filteredUmkmList.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p className="text-sm font-semibold mb-1">Tidak ada hasil</p>
                                        <p className="text-xs opacity-75">
                                            {searchQuery ? `Tidak ditemukan UMKM dengan kata kunci "${searchQuery}"` : 'Tidak ada UMKM di kategori ini'}
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
                                <div key={umkm.id} className="bg-white rounded-xl p-3 shadow-sm flex-shrink-0 h-[135px]">
                                    <div className="flex gap-3 h-full">
                                        <div className="w-[95px] h-[111px] bg-gray-300 rounded-lg flex-shrink-0 overflow-hidden">
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
                                                        {searchQuery ? highlightText(umkm.name, searchQuery) : umkm.name}
                                                    </h3>
                                                    <span className="bg-[#FFC107] text-black text-[10px] font-bold px-2 py-1 rounded flex-shrink-0">
                                                        {searchQuery ? highlightText(umkm.category, searchQuery) : umkm.category}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-gray-500 leading-tight">
                                                    Omset Penjualan<br />
                                                    Rp. 10.000.000 - Rp. 100.000.000
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleViewLocation(umkm.name)}
                                                className="text-xs text-[#003F88] font-semibold flex items-center gap-1 hover:underline"
                                            >
                                                Lihat Lokasi →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                ))
                            )}
                        </div>

                        {/* Navigation Buttons - Up/Down at bottom */}
                        <div className="flex justify-center gap-3 pt-4 flex-shrink-0">
                            <button
                                onClick={handlePrevPage}
                                disabled={isAtStart}
                                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${isAtStart
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-white text-[#003F88] hover:bg-gray-100'
                                    }`}
                            >
                                <ChevronUp className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNextPage}
                                disabled={isAtEnd}
                                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${isAtEnd
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-white text-[#003F88] hover:bg-gray-100'
                                    }`}
                            >
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Map - Mapbox Integration */}
                    <div className="rounded-r-lg h-[850px] relative overflow-hidden">
                        <Map
                            mapboxAccessToken={MAPBOX_TOKEN}
                            initialViewState={{
                                longitude: 106.8556,
                                latitude: -6.2288,
                                zoom: 12
                            }}
                            style={{ width: '100%', height: '100%' }}
                            mapStyle="mapbox://styles/mapbox/streets-v12"
                        >
                            {/* Navigation Controls */}
                            <NavigationControl position="bottom-right" />

                            {/* UMKM Markers - Filtered by category */}
                            {filteredUmkmList.map((umkm) => (
                                <Marker
                                    key={umkm.id}
                                    longitude={umkm.longitude}
                                    latitude={umkm.latitude}
                                    anchor="bottom"
                                >
                                    <div
                                        className="w-10 h-10 rounded-full border-3 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center"
                                        style={{ backgroundColor: umkm.color }}
                                        onClick={() => handleViewLocation(umkm.name)}
                                        title={`${umkm.name} - ${umkm.category}`}
                                    >
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                </Marker>
                            ))}
                        </Map>
                    </div>
                </div>
            </div>
        </section>
    );
}
