import { useEffect, useState, useRef } from "react";
import { Store, Grid3x3, Users, Star, TrendingUp, MapPin } from "lucide-react";
import { umkmList, categories } from "@/data/umkmData";

// Counter animation hook
const useCountUp = (end: number, duration: number = 2000, start: number = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * (end - start) + start));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [isVisible, end, duration, start]);

  return { count, ref };
};

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  color: string;
  delay?: number;
}

const StatCard = ({ icon: Icon, value, suffix = "", label, color, delay = 0 }: StatCardProps) => {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${color} flex items-center justify-center mb-4 mx-auto`}>
        <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
      </div>
      <div className="text-center">
        <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
          {count}{suffix}
        </div>
        <div className="text-sm md:text-base text-gray-600 font-medium">
          {label}
        </div>
      </div>
    </div>
  );
};

export default function StatisticsSection() {
  // Calculate real statistics from data
  const totalUmkm = umkmList.length;
  const totalCategories = categories.length - 1; // Exclude "Semua"
  const totalVisitors = 1200; // Mock data - bisa diganti dengan real data
  const averageRating = 4.8; // Mock data
  const growthPercentage = 45; // Mock data
  const totalLocations = new Set(umkmList.map(u => u.address)).size;

  return (
    <section className="py-12 md:py-20 px-4 md:px-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Dampak UMKM Mamung
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Bersama membangun ekonomi lokal dan memberdayakan UMKM di Indonesia
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <StatCard
            icon={Store}
            value={totalUmkm}
            suffix="+"
            label="UMKM Terdaftar"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            delay={0}
          />
          
          <StatCard
            icon={Grid3x3}
            value={totalCategories}
            label="Kategori Usaha"
            color="bg-gradient-to-br from-green-500 to-green-600"
            delay={100}
          />
          
          <StatCard
            icon={Users}
            value={totalVisitors}
            suffix="+"
            label="Pengunjung"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            delay={200}
          />
          
          <StatCard
            icon={Star}
            value={averageRating}
            label="Rating Rata-rata"
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
            delay={300}
          />
          
          <StatCard
            icon={TrendingUp}
            value={growthPercentage}
            suffix="%"
            label="Pertumbuhan"
            color="bg-gradient-to-br from-red-500 to-red-600"
            delay={400}
          />
          
          <StatCard
            icon={MapPin}
            value={totalLocations}
            suffix="+"
            label="Lokasi Tersebar"
            color="bg-gradient-to-br from-indigo-500 to-indigo-600"
            delay={500}
          />
        </div>
      </div>
    </section>
  );
}
