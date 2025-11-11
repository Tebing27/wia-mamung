import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LocationSection from "./components/LocationSection";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategorySection />
      <LocationSection />
      <Footer />
    </>
  );
}

export default App;
