import {Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
        e.preventDefault();

        // Check if it's a hash link
        if (to.startsWith("/#")) {
            const hash = to.substring(1); // Remove the leading /

            // Navigate to home if not already there
            if (window.location.pathname !== "/") {
                navigate(to);
            } else {
                // Already on home, just scroll
                if (hash === "#beranda") {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const element = document.querySelector(hash);
                    if (element) {
                        const offset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        } else {
            navigate(to);
        }
    };

    return (
        <footer className="bg-gradient-to-br from-[#002A6B] to-[#003F88] text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-[#FFC107] rounded-lg flex items-center justify-center">
                                <span className="text-[#002A6B] font-bold text-xl">M</span>
                            </div>
                            <h2 className="text-2xl font-bold">UMKM Mamung</h2>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed mb-6">
                            Platform digital untuk menemukan, mendukung, dan mengembangkan UMKM lokal di Indonesia.
                        </p>

                        {/* Social Media */}
                        <div className="flex gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-[#FFC107] rounded-full flex items-center justify-center transition-all hover:scale-110"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-[#FFC107] rounded-full flex items-center justify-center transition-all hover:scale-110"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-[#FFC107] rounded-full flex items-center justify-center transition-all hover:scale-110"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Navigasi</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/#beranda"
                                    onClick={(e) => handleClick(e, "/#beranda")}
                                    className="text-sm text-white/80 hover:text-[#FFC107] transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-[#FFC107] rounded-full group-hover:w-2 transition-all"></span>
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/#statistik"
                                    onClick={(e) => handleClick(e, "/#statistik")}
                                    className="text-sm text-white/80 hover:text-[#FFC107] transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-[#FFC107] rounded-full group-hover:w-2 transition-all"></span>
                                    Statistik
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/#lokasi"
                                    onClick={(e) => handleClick(e, "/#lokasi")}
                                    className="text-sm text-white/80 hover:text-[#FFC107] transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-[#FFC107] rounded-full group-hover:w-2 transition-all"></span>
                                    Lokasi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/katalog"
                                    onClick={(e) => handleClick(e, "/katalog")}
                                    className="text-sm text-white/80 hover:text-[#FFC107] transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-1 h-1 bg-[#FFC107] rounded-full group-hover:w-2 transition-all"></span>
                                    Katalog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* About Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Tentang</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-white/80 hover:text-[#FFC107] transition-colors inline-flex items-center gap-2 group">
                                    <span className="w-1 h-1 bg-[#FFC107] rounded-full group-hover:w-2 transition-all"></span>
                                    Tentang Kami
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-white/80 hover:text-[#FFC107] transition-colors inline-flex items-center gap-2 group">
                                    <span className="w-1 h-1 bg-[#FFC107] rounded-full group-hover:w-2 transition-all"></span>
                                    Cara Kerja
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-white/80 hover:text-[#FFC107] transition-colors inline-flex items-center gap-2 group">
                                    <span className="w-1 h-1 bg-[#FFC107] rounded-full group-hover:w-2 transition-all"></span>
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-white/80 hover:text-[#FFC107] transition-colors inline-flex items-center gap-2 group">
                                    <span className="w-1 h-1 bg-[#FFC107] rounded-full group-hover:w-2 transition-all"></span>
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">Kontak</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-sm text-white/80">
                                <Mail className="w-5 h-5 shrink-0 text-[#FFC107]" />
                                <a href="mailto:info@umkmmamung.id" className="hover:text-[#FFC107] transition-colors">
                                    info@umkmmamung.id
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-white/80">
                                <Phone className="w-5 h-5 shrink-0 text-[#FFC107]" />
                                <a href="tel:+6281234567890" className="hover:text-[#FFC107] transition-colors">
                                    +62 812-3456-7890
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-white/60 text-center md:text-left">
                            © {new Date().getFullYear()} UMKM Mamung. Dikembangkan untuk UMKM Indonesia.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            <a href="#" className="text-xs text-white/60 hover:text-[#FFC107] transition-colors">
                                Syarat & Ketentuan
                            </a>
                            <a href="#" className="text-xs text-white/60 hover:text-[#FFC107] transition-colors">
                                Kebijakan Privasi
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
