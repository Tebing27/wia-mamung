import { ChevronLeft, MapPin, Phone, Globe, Instagram, Facebook, MapIcon } from "lucide-react";
import { umkmList } from "@/data/umkmData";

interface UmkmDetailProps {
  umkmId: number;
  onBack?: () => void;
}

export default function UmkmDetail({ umkmId, onBack }: UmkmDetailProps) {
  const umkm = umkmList.find(u => u.id === umkmId);

  if (!umkm) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">UMKM tidak ditemukan</h2>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-[#0B4EA2] text-white rounded-lg hover:bg-[#083d7f] transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 md:px-20 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#0B4EA2] hover:text-[#083d7f] transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Kembali
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-20 py-8">
        <div className="bg-white rounded-xl overflow-hidden shadow-lg">
          {/* Image Hero */}
          <div className="relative h-96 bg-gray-200 overflow-hidden">
            <img
              src={umkm.imageUrl}
              alt={umkm.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-[#FFC107] text-black text-sm font-bold px-4 py-2 rounded-full">
                {umkm.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Title & Description */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {umkm.name}
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {umkm.description}
            </p>

            {/* Grid Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Kontak</h2>
                <div className="space-y-4">
                  {/* Address */}
                  {umkm.address && (
                    <div className="flex gap-4">
                      <MapPin className="w-6 h-6 text-[#0B4EA2] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Alamat</p>
                        <p className="text-gray-600">{umkm.address}</p>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {umkm.phone && (
                    <div className="flex gap-4">
                      <Phone className="w-6 h-6 text-[#0B4EA2] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Nomor Telepon</p>
                        <a
                          href={`tel:${umkm.phone}`}
                          className="text-[#0B4EA2] hover:text-[#083d7f] transition-colors"
                        >
                          {umkm.phone}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* License */}
                  {umkm.license && (
                    <div className="flex gap-4">
                      <div className="w-6 h-6 text-[#0B4EA2] flex-shrink-0 mt-1">
                        <span className="text-lg">✓</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Sertifikasi</p>
                        <p className="text-gray-600">{umkm.license}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Social & Website */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Hubungi Kami</h2>
                <div className="space-y-4">
                  {/* Website */}
                  {umkm.website && (
                    <div className="flex gap-4">
                      <Globe className="w-6 h-6 text-[#0B4EA2] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">Website</p>
                        <a
                          href={`https://${umkm.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0B4EA2] hover:text-[#083d7f] transition-colors break-all"
                        >
                          {umkm.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Social Media */}
                  {(umkm.instagram || umkm.facebook || umkm.tiktok) && (
                    <div>
                      <p className="font-semibold text-gray-900 mb-3">Media Sosial</p>
                      <div className="flex gap-3 flex-wrap">
                        {umkm.instagram && (
                          <a
                            href={`https://instagram.com/${umkm.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                          >
                            <Instagram className="w-5 h-5" />
                            Instagram
                          </a>
                        )}
                        {umkm.facebook && (
                          <a
                            href={`https://facebook.com/${umkm.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition-opacity"
                          >
                            <Facebook className="w-5 h-5" />
                            Facebook
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Maps Button */}
            {umkm.mapsUrl && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <a
                  href={umkm.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B4EA2] text-white font-semibold rounded-lg hover:bg-[#083d7f] transition-colors"
                >
                  <MapIcon className="w-5 h-5" />
                  Lihat di Google Maps
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
