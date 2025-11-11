# Mapbox Setup Guide

## 🗺️ Getting Your Mapbox API Token

### Step 1: Create Mapbox Account
1. Go to [https://account.mapbox.com/auth/signup/](https://account.mapbox.com/auth/signup/)
2. Sign up with your email (FREE - no credit card required)
3. Verify your email

### Step 2: Get Your Access Token
1. After login, you'll be redirected to your account page
2. Or go to [https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)
3. You'll see a **Default public token** already created
4. Copy this token

### Step 3: Add Token to Your Project
1. Open the `.env` file in your project root
2. Replace `your_mapbox_token_here` with your actual token:
   ```
   VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNsZjR4eHh4eHh4eHh4In0.xxxxxxxxxxxxxxxxx
   ```
3. Save the file
4. Restart your development server

## 🚀 Running the Project

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

## 📍 Customizing Map

### Change Map Style
In `LocationSection.tsx`, you can change the `mapStyle` prop:

```tsx
mapStyle="mapbox://styles/mapbox/streets-v12"  // Default
mapStyle="mapbox://styles/mapbox/dark-v11"     // Dark theme
mapStyle="mapbox://styles/mapbox/light-v11"    // Light theme
mapStyle="mapbox://styles/mapbox/satellite-v9" // Satellite view
```

### Update UMKM Coordinates
Edit the `umkmList` array in `LocationSection.tsx`:

```tsx
{
  id: 1,
  name: "Your UMKM Name",
  latitude: -6.2088,  // Your latitude
  longitude: 106.8456, // Your longitude
  color: "#EF4444"     // Marker color
}
```

### Get Coordinates
- Use [https://www.latlong.net/](https://www.latlong.net/)
- Or right-click on Google Maps and copy coordinates

## 🎨 Marker Colors
Current marker colors match the design:
- Red: `#EF4444` - Kuliner
- Blue: `#3B82F6` - Minuman
- Yellow: `#F59E0B` - Fashion
- Green: `#10B981` - Others

## 📦 Free Tier Limits
- **50,000 map loads per month** (FREE)
- No credit card required
- Perfect for development and small projects

## 🔧 Troubleshooting

### Map not showing?
1. Check if `.env` file has the correct token
2. Restart dev server after adding token
3. Check browser console for errors

### "Invalid token" error?
1. Make sure token starts with `pk.`
2. Copy the entire token (it's very long)
3. No spaces before/after the token

### Markers not appearing?
1. Check coordinates are valid (latitude: -90 to 90, longitude: -180 to 180)
2. Adjust zoom level in `initialViewState`

## 📚 Resources
- [Mapbox Documentation](https://docs.mapbox.com/)
- [react-map-gl Documentation](https://visgl.github.io/react-map-gl/)
- [Mapbox Studio](https://studio.mapbox.com/) - Create custom map styles
