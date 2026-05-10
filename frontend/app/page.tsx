"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/sections/HeroSection";
import ProductSection from "@/components/sections/ProductSection";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />

      <main>
        <HeroSection />

        <ProductSection />
      </main>

      <Footer />
    </div>
  );
}
