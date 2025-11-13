# UMKM Mamung - Platform Pencarian UMKM Lokal

Platform web interaktif untuk menemukan dan mendukung UMKM (Usaha Mikro, Kecil, dan Menengah) lokal di wilayah Mamung dengan fitur peta interaktif dan pencarian yang mudah digunakan.

## 🚀 Tech Stack

- **React** - Library JavaScript untuk membangun user interface
- **TypeScript** - Superset JavaScript dengan type safety
- **Vite** - Build tool dan development server yang cepat
- **Tailwind CSS** - Utility-first CSS framework untuk styling
- **Mapbox GL JS** - Library untuk peta interaktif
- **react-map-gl** - React wrapper untuk Mapbox
- **Lucide React** - Icon library modern
- **Shadcn UI** - Reusable component library

## 📦 Cara Menjalankan Project

### Prerequisites
- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn
- Mapbox Access Token (gratis dari [mapbox.com](https://www.mapbox.com/))

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone https://github.com/Tebing27/wia-mamung.git
   cd wia-mamung
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Buat file `.env` di root folder dan tambahkan Mapbox token:
   ```env
   VITE_MAPBOX_TOKEN=your_mapbox_token_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Buka browser**
   
   Akses `http://localhost:5173`

## 📋 Progress Saat Ini

### ✅ Fitur yang Sudah Selesai

#### 1. Landing Page (Hero Section)
- Hero section dengan carousel auto-play menampilkan UMKM unggulan
- Responsive design untuk mobile, tablet, dan desktop
- Tombol "Lihat Lokasi" yang mengarah ke peta dengan zoom otomatis

#### 2. Halaman Kategori
- Tampilan kategori UMKM (Kuliner, Fashion, Perdagangan, Jasa)
- Pagination dengan navigasi prev/next
- Filter kategori yang terintegrasi dengan peta

#### 3. Halaman Lokasi (Map Section)
- **Peta Interaktif Mapbox** dengan marker untuk setiap UMKM
- **Fitur Pencarian** real-time dengan highlighting hasil
- **Filter Kategori** dengan dropdown
- **Pagination** untuk daftar UMKM (4 cards per halaman)
- **Detail Popup** dengan informasi lengkap UMKM:
  - Nama, kategori, deskripsi
  - Alamat lengkap
  - Lisensi usaha
  - Social media (Instagram, Facebook, TikTok)
  - Website dan nomor telepon
  - Link ke Google Maps
- **Zoom to Marker** dari Hero Section
- **Responsive Layout** untuk mobile dan desktop

#### 4. Navigation & Footer
- Navbar sticky dengan smooth scroll
- Mobile hamburger menu
- Footer dengan link navigasi dan social media
- Semua link berfungsi dengan baik

#### 5. Data Management
- Centralized data structure di `src/data/umkmData.ts`
- TypeScript interfaces untuk type safety
- 10 UMKM dengan data lengkap
- Helper functions untuk filtering dan searching

### 🎨 Design Features
- Mobile-first responsive design
- Smooth animations dan transitions
- Color scheme konsisten (Blue: #0B4EA2, Yellow: #FFC107)
- Touch-friendly buttons untuk mobile
- Loading states dan empty states

### 📱 Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🗂️ Struktur Project

```
wia-mamung/
├── src/
│   ├── assets/          # Images dan static files
│   ├── components/      # React components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── CategorySection.tsx
│   │   ├── LocationSection.tsx
│   │   ├── Footer.tsx
│   │   └── ui/          # Reusable UI components
│   ├── data/            # Data dan helper functions
│   │   └── umkmData.ts
│   ├── App.tsx          # Main app component
│   └── index.css        # Global styles
├── .env                 # Environment variables (not committed)
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Build untuk Production

```bash
npm run build
```

Output akan ada di folder `dist/`

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_MAPBOX_TOKEN` | Mapbox access token untuk peta interaktif | Yes |

## 🤝 Contributing

Contributions, issues, dan feature requests sangat diterima!

## 📄 License

This project is open source.

## 👨‍💻 Developer

Developed with ❤️ for UMKM Mamung

---

**Note:** Pastikan untuk tidak commit file `.env` ke repository. File ini sudah ada di `.gitignore`.
