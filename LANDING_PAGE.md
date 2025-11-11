# UMKM SASUMA Landing Page

Landing page responsive untuk UMKM Sasuma yang dibangun berdasarkan design Figma. Menampilkan UMKM (Usaha Mikro, Kecil, dan Menengah) lokal di wilayah Sasuma.

## Sections

1. **Navbar** - Navigation bar dengan menu hamburger untuk mobile
2. **Hero Section** - Background biru dengan heading, deskripsi, dan carousel UMKM featured
3. **Category Section** - Tiga kategori lokasi (Pengasinan, Cinangka, Kedaung) dengan jumlah UMKM
4. **Location Section** - Peta interaktif dengan sidebar daftar UMKM dan filter
5. **Footer** - Links, social media, dan copyright

## Components

- `Navbar.tsx` - Navigation bar responsive dengan hamburger menu
- `HeroSection.tsx` - Hero section dengan carousel UMKM
- `CategorySection.tsx` - Grid kategori dengan navigasi
- `LocationSection.tsx` - Peta dengan sidebar UMKM
- `Footer.tsx` - Footer responsive

## Responsive Design

### Mobile (< 768px)
- Navbar: Hamburger menu
- Hero: Stack vertical, gambar di atas
- Category: 2 kolom grid
- Location: Peta penuh dengan sidebar di bawah
- Footer: 2 kolom grid

### Desktop (≥ 768px)
- Navbar: Horizontal menu
- Hero: Side by side layout
- Category: "Ayo Jelajahi" di kiri, 3 kartu di kanan
- Location: Sidebar kiri, peta kanan
- Footer: 4 kolom grid

## Color Scheme

- Primary Blue: `#003F88`, `#00509D`
- Dark Blue: `#002A6B`
- Category Colors:
  - Pengasinan: `#C4F0DD` (light green)
  - Cinangka: `#B4CCFE` (light blue)
  - Kedaung: `#9FE8BE` (mint green)
- Accent: `#FFC107` (yellow)

## Run Development

```bash
npm install
npm run dev
```

## Notes

- Fully responsive untuk mobile dan desktop
- Menggunakan Tailwind CSS untuk styling
- Images menggunakan placeholder - ganti dengan gambar asli
- Map markers sudah diposisikan sesuai design
- Carousel navigation sudah functional
