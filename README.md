# UMKM SASUMA Landing Page

Landing page responsive untuk UMKM Sasuma dengan integrasi Mapbox untuk menampilkan lokasi UMKM.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Mapbox API Key
1. Buat akun gratis di [Mapbox](https://account.mapbox.com/auth/signup/)
2. Copy API token dari [Access Tokens page](https://account.mapbox.com/access-tokens/)
3. Buat file `.env` di root project:
   ```
   VITE_MAPBOX_TOKEN=your_mapbox_token_here
   ```
4. Ganti `your_mapbox_token_here` dengan token Mapbox kamu

### 3. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/
│   │   └── button.tsx          # Reusable button component
│   ├── Navbar.tsx              # Sticky navigation
│   ├── HeroSection.tsx         # Hero with carousel
│   ├── CategorySection.tsx     # Category cards with pagination
│   ├── LocationSection.tsx     # Map with UMKM listings (Mapbox)
│   └── Footer.tsx              # Footer
├── App.tsx                     # Main app
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

## 🗺️ Mapbox Integration

### Features
- Interactive map dengan Mapbox
- Custom markers untuk setiap UMKM
- Zoom dan pan controls
- Click markers untuk view details
- Responsive design

### Customization

#### Change Map Style
Edit `LocationSection.tsx`:
```tsx
mapStyle="mapbox://styles/mapbox/streets-v12"  // Streets (default)
mapStyle="mapbox://styles/mapbox/dark-v11"     // Dark
mapStyle="mapbox://styles/mapbox/light-v11"    // Light
mapStyle="mapbox://styles/mapbox/satellite-v9" // Satellite
```

#### Update UMKM Locations
Edit `umkmList` array in `LocationSection.tsx`:
```tsx
{
  id: 1,
  name: "UMKM Name",
  category: "Kuliner",
  latitude: -6.2088,   // Your coordinates
  longitude: 106.8456,
  color: "#EF4444"     // Marker color
}
```

Get coordinates: [latlong.net](https://www.latlong.net/)

## 🎨 Design System

### Colors
- Primary Blue: `#003F88`, `#00509D`
- Accent Yellow: `#FFC107`
- Category Colors: `#C4F0DD`, `#B4CCFE`, `#9FE8BE`

### Responsive Breakpoints
- Mobile: `< 768px`
- Tablet: `768px - 1024px` (md)
- Desktop: `> 1024px` (lg)

## 📦 Tech Stack

- **React 19** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Mapbox GL JS** - Interactive maps
- **react-map-gl** - React wrapper for Mapbox
- **Lucide React** - Icons

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📝 Environment Variables

Create `.env` file:
```
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

**Note:** Never commit `.env` file to git. Use `.env.example` as template.

## 🌟 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Interactive Mapbox integration
- ✅ UMKM carousel with navigation
- ✅ Category pagination system
- ✅ Sticky navbar with scroll effects
- ✅ Search and filter functionality
- ✅ Custom markers with colors
- ✅ Smooth animations and transitions

## 📚 Documentation

- [Mapbox Setup Guide](./MAPBOX_SETUP.md) - Detailed Mapbox setup
- [Landing Page Docs](./LANDING_PAGE.md) - Component documentation

## 🆓 Mapbox Free Tier

- 50,000 map loads per month
- No credit card required
- Perfect for development and small projects

## 🐛 Troubleshooting

### Map not showing?
1. Check `.env` file has correct token
2. Restart dev server: `Ctrl+C` then `npm run dev`
3. Check browser console for errors

### TypeScript errors?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

MIT

## 👨‍💻 Author

UMKM Sasuma Team
