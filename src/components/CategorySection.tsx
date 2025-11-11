import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useState } from "react";
import fashion from "../assets/fashion.jpg";
import kuliner from "../assets/kuliner.jpg";


const categories = [
    {
        id: 1,
        name: "Fashion",
        umkmCount: "20 UMKM",
        bgColor: "bg-[#C4F0DD]",
        imageUrl: fashion
    },
    {
        id: 2,
        name: "Kuliner",
        umkmCount: "22 UMKM",
        bgColor: "bg-[#B4CCFE]",
        imageUrl: kuliner
    },
    {
        id: 3,
        name: "Kedaung",
        umkmCount: "20 UMKM",
        bgColor: "bg-[#9FE8BE]",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Jakarta",
        umkmCount: "20 UMKM",
        bgColor: "bg-[#B6CEB4]",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Pondok Labu",
        umkmCount: "20 UMKM",
        bgColor: "bg-[#D9E9CF]",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Cikarang",
        umkmCount: "20 UMKM",
        bgColor: "bg-[#9FE8BE]",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Tanjung Prioek",
        umkmCount: "20 UMKM",
        bgColor: "bg-[#B6CEB4]",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Bekasi",
        umkmCount: "20 UMKM",
        bgColor: "bg-[#96A78D]",
        imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"
    }
];

export default function CategorySection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Desktop: show 3 cards at a time
    const itemsPerPageDesktop = 3;
    // Mobile: show 2 cards at a time
    const itemsPerPageMobile = 2;

    // Calculate total pages
    const totalPagesDesktop = Math.ceil(categories.length / itemsPerPageDesktop);
    const totalPagesMobile = Math.ceil(categories.length / itemsPerPageMobile);

    const handlePrev = () => {
        setCurrentIndex((prev) => {
            // Go to previous page (jump by itemsPerPageDesktop)
            const newIndex = prev - itemsPerPageDesktop;
            // Don't go below 0
            return Math.max(0, newIndex);
        });
    };

    const handleNext = () => {
        setCurrentIndex((prev) => {
            // Go to next page (jump by itemsPerPageDesktop)
            const newIndex = prev + itemsPerPageDesktop;
            // Don't go beyond last page
            const maxIndex = (totalPagesDesktop - 1) * itemsPerPageDesktop;
            return Math.min(newIndex, maxIndex);
        });
    };

    // Check if we're at the start or end
    const isAtStart = currentIndex === 0;
    const isAtEnd = currentIndex >= (totalPagesDesktop - 1) * itemsPerPageDesktop;

    const handleViewLocation = (categoryName: string) => {
        console.log(`View location for: ${categoryName}`);
        // Navigate to location or show map
    };

    // Get visible categories for desktop (show 3 cards per page)
    const visibleCategoriesDesktop = categories.slice(currentIndex, currentIndex + itemsPerPageDesktop);
    // Get visible categories for mobile (always show 2 cards)
    const visibleCategoriesMobile = categories.slice(currentIndex, currentIndex + itemsPerPageMobile);
    return (
        <section className="py-12 md:py-20 px-4 md:px-20 bg-white">
            <div className="container mx-auto max-w-7xl">
                {/* Title */}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-16">
                    Kategori
                </h2>

                {/* Mobile Layout */}
                <div className="md:hidden">
                    {/* Ayo Jelajahi Text */}
                    <div className="mb-6 px-2">
                        <h3 className="text-2xl font-bold mb-2 leading-tight">
                            Ayo Jelajahi
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            berbagai jenis usaha lokal di wilayah kalian berada
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 justify-end mb-6 px-2">
                        <button
                            onClick={handlePrev}
                            disabled={isAtStart}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                isAtStart 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-[#00509D] text-white hover:bg-[#003d7a]'
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={isAtEnd}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                isAtEnd 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-[#00509D] text-white hover:bg-[#003d7a]'
                            }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Category Cards - 2 columns on mobile */}
                    <div className="grid grid-cols-2 gap-4">
                        {visibleCategoriesMobile.map((category) => (
                            <div
                                key={category.id}
                                className={`${category.bgColor} rounded-lg p-4 flex flex-col`}
                            >
                                <div className="bg-gray-800 rounded-lg h-[122px] mb-4 overflow-hidden">
                                    <img
                                        src={category.imageUrl}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-center mb-1">
                                    {category.name}
                                </h3>
                                <p className="text-center text-gray-700 mb-3 text-xs">
                                    {category.umkmCount}
                                </p>
                                <button
                                    onClick={() => handleViewLocation(category.name)}
                                    className="flex items-center justify-center gap-1 text-xs hover:underline mx-auto text-gray-700"
                                >
                                    Lihat Toko
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-12 gap-8 items-center">
                    {/* Left Side - Ayo Jelajahi */}
                    <div className="col-span-3">
                        <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                            Ayo Jelajahi
                        </h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            berbagai jenis usaha lokal di wilayah kalian berada
                        </p>

                        {/* Navigation Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handlePrev}
                                className="w-10 h-10 rounded-full bg-[#00509D] text-white flex items-center justify-center hover:bg-[#003d7a] transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-10 h-10 rounded-full bg-[#00509D] text-white flex items-center justify-center hover:bg-[#003d7a] transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Category Cards */}
                    <div className="col-span-9">
                        <div className="grid grid-cols-3 gap-6">
                            {visibleCategoriesDesktop.map((category) => (
                                <div
                                    key={category.id}
                                    className={`${category.bgColor} rounded-lg p-6 flex flex-col`}
                                >
                                    <div className="bg-gray-800 rounded-lg h-[180px] mb-6 overflow-hidden">
                                        <img
                                            src={category.imageUrl}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-bold text-center mb-2">
                                        {category.name}
                                    </h3>
                                    <p className="text-center text-gray-700 mb-4 text-sm">
                                        {category.umkmCount}
                                    </p>
                                    <button
                                        onClick={() => handleViewLocation(category.name)}
                                        className="flex items-center justify-center gap-1 text-sm hover:underline mx-auto text-gray-700"
                                    >
                                        Lihat Toko
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
