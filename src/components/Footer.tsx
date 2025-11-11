import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#002A6B] text-white py-12 md:py-16">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Logo */}
                <div className="mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">UMKM Mamung</h2>
                </div>

                {/* Links Grid - Mobile: 2 columns, Desktop: 4 columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
                    {/* Links Column 1 */}
                    <div>
                        <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
                            <li><a href="#" className="hover:underline">Email Marketing</a></li>
                            <li><a href="#" className="hover:underline">Offline</a></li>
                            <li><a href="#" className="hover:underline">Flex</a></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
                            <li><a href="#" className="hover:underline">Campaigns</a></li>
                            <li><a href="#" className="hover:underline">Campaigns</a></li>
                            <li><a href="#" className="hover:underline">Flex</a></li>
                        </ul>
                    </div>

                    {/* Links Column 3 */}
                    <div>
                        <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
                            <li><a href="#" className="hover:underline">Branding</a></li>
                            <li><a href="#" className="hover:underline">Offline</a></li>
                            <li><a href="#" className="hover:underline">Flex</a></li>
                        </ul>
                    </div>

                    {/* Social Media - Mobile: in grid, Desktop: separate */}
                    <div className="md:hidden">
                        <div className="flex gap-4">
                            <a href="#" className="hover:opacity-80">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="hover:opacity-80">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="hover:opacity-80">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Social Media - Desktop only */}
                <div className="hidden md:flex justify-end gap-6 mb-12">
                    <a href="#" className="hover:opacity-80">
                        <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:opacity-80">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:opacity-80">
                        <Instagram className="w-5 h-5" />
                    </a>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/20">
                    <p className="text-xs md:text-sm text-center md:text-left">
                        Copyright © 2020. Lo
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-center">
                        <a href="#" className="text-xs md:text-sm hover:underline">
                            Terms & Conditions
                        </a>
                        <a href="#" className="text-xs md:text-sm hover:underline">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
