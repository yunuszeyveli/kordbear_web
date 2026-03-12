// src/pages/HomePage.jsx
import { useState } from "react";
import { COLORS } from "../styles/theme";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import ProductsSection from "../components/sections/ProductsSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import CtaBanner from "../components/sections/CtaBanner";

export default function HomePage() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <Navbar cartCount={cartItems.length} />
      <HeroSection />
      <StatsSection />
      <ProductsSection onAddToCart={handleAddToCart} />
      <HowItWorksSection />
      <CtaBanner />
      <Footer />
    </div>
  );
}
